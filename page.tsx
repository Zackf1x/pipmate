import React from 'react';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">PipMate</h1>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
