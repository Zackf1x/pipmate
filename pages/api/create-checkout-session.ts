import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1RRgiHIhpDgLkAwyhCmTrL74', // real Stripe Price ID
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/dashboard?success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
