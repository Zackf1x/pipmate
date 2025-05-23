import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import StripeProvider from './StripeProvider'; // adjust path if needed


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  // If the user is not signed in, redirect to the sign-in page
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <StripeProvider>
        {children}
      </StripeProvider>
    </div>
  );
}
