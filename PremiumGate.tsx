import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface PremiumGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Check if user has premium subscription
  const isPremium = session?.user?.subscriptionTier === 'premium';
  
  // If not authenticated, redirect to sign in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex justify-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>
      </div>
    );
  }
  
  // If authenticated but not premium, show fallback or redirect to pricing
  if (!isPremium) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">Premium Feature</h3>
          <p className="text-gray-300 mb-6">
            This feature is available exclusively for premium subscribers.
            Upgrade now to unlock all PipMate features.
          </p>
          <button 
            onClick={() => router.push('/dashboard/pricing')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }
  
  // If premium, show the children
  return <>{children}</>;
}
