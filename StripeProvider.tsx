import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
