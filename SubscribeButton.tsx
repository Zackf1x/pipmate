import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribeButton() {
  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Subscribe Now
    </button>
  );
}
