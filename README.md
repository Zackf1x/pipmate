# PipMate - Trading Assistant Web App

PipMate is a modern web application that serves as a trading assistant powered by a custom GPT. It helps users find daily forex, indices, gold, and oil trading opportunities based on Smart Money Concepts (SMC), Fibonacci, and fundamental analysis.

## Features

- **Authentication**: Email, Google, and Apple login options
- **User Dashboard**: Asset class selection and daily trade ideas
- **GPT Integration**: Custom GPT assistant via iframe embedding
- **File Upload**: Trading journal analysis for premium users
- **Premium Access**: Subscription-based model with Stripe integration
- **Admin Panel**: User management, trade idea management, and analytics

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **File Handling**: React Dropzone
- **Charts**: Chart.js with React-Chartjs-2

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /admin             # Admin panel pages
    /auth              # Authentication pages
    /dashboard         # User dashboard pages
    /api               # API routes
  /components          # Reusable components
    /admin             # Admin-specific components
    /auth              # Authentication components
    /dashboard         # Dashboard components
    /premium           # Premium features components
    /stripe            # Payment components
    /upload            # File upload components
    /common            # Shared components
  /lib                 # Utility functions and helpers
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.local.example`)
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

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

## Deployment

The application can be deployed to Vercel or Netlify:

1. Connect your repository to Vercel/Netlify
2. Set up the environment variables
3. Deploy the application

## Future Enhancements

- Direct OpenAI API integration for the GPT assistant
- Database storage for user conversations and trade history
- Mobile app version
- Advanced backtesting tools
- Social sharing features

## License

This project is proprietary and confidential.
