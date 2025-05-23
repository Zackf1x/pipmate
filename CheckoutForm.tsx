"use client";
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
  priceId: string;
  productName: string;
  amount: number;
}

export default function CheckoutForm({ priceId, productName, amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a payment intent on the server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred during checkout');
      }
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">{productName}</h3>
        <p className="text-gray-300 mb-4">
          ${amount.toFixed(2)}/month
        </p>
        
        <div className="mb-6">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-300 mb-2">
            Card Details
          </label>
          <div className="bg-gray-700 p-4 rounded-md">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
            />
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            !stripe || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : `Subscribe Now`}
        </button>
      </div>
    </form>
  );
}
