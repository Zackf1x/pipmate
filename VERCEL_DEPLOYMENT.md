# Vercel Deployment Instructions for PipMate

This guide will walk you through deploying your PipMate trading assistant application to Vercel, ensuring all features including authentication, API routes, and Stripe integration work properly.

## Prerequisites

1. A GitHub account
2. A Vercel account (free tier is sufficient to start)
3. OAuth credentials from Google and Apple
4. A Stripe account with API keys

## Step 1: Prepare Your Repository

1. Create a new GitHub repository
2. Push your PipMate codebase to this repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/pipmate.git
   git push -u origin main
   ```

## Step 2: Connect to Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account
2. Click "Add New..." and select "Project"
3. Find and select your PipMate repository
4. Keep the default framework preset as "Next.js"

## Step 3: Configure Environment Variables

In the Vercel project setup, add the following environment variables:

```
# Authentication
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Database (for future implementation)
DATABASE_URL=your-database-url
```

Note: The `NEXTAUTH_URL` will be automatically set by Vercel.

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Vercel will provide you with a deployment URL (e.g., https://pipmate.vercel.app)

## Step 5: Set Up OAuth Providers

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel deployment URL to the Authorized JavaScript origins:
   ```
   https://pipmate.vercel.app
   ```
5. Add the following to Authorized redirect URIs:
   ```
   https://pipmate.vercel.app/api/auth/callback/google
   ```

### Apple OAuth

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Update your Services ID with the Vercel deployment URL
4. Update the Return URL to:
   ```
   https://pipmate.vercel.app/api/auth/callback/apple
   ```

## Step 6: Set Up Stripe Webhooks

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to "Developers" > "Webhooks"
3. Add an endpoint with the URL:
   ```
   https://pipmate.vercel.app/api/webhook
   ```
4. Select the following events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
5. Get the webhook signing secret and update your Vercel environment variable `STRIPE_WEBHOOK_SECRET`

## Step 7: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the authentication flow (email, Google, Apple)
3. Test the premium subscription flow (use Stripe test cards)
4. Test the GPT assistant and file upload features

## Troubleshooting

If you encounter any issues:

1. Check Vercel deployment logs for errors
2. Verify all environment variables are correctly set
3. Ensure OAuth redirect URIs are properly configured
4. Test Stripe webhooks using the Stripe CLI

## Future Updates

To update your application:

1. Make changes to your local codebase
2. Commit and push to GitHub
3. Vercel will automatically redeploy your application

## Custom Domain (Optional)

1. In your Vercel project, go to "Settings" > "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS settings

## Need Help?

If you need assistance with deployment, please contact me and I'll be happy to help troubleshoot any issues.
