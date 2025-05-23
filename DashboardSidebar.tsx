"use client";
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

// Navigation items for the sidebar
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
  { name: 'Trade Ideas', href: '/dashboard/trade-ideas', icon: 'ChartBarIcon' },
  { name: 'GPT Assistant', href: '/dashboard/assistant', icon: 'ChatBubbleLeftRightIcon' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'Cog6ToothIcon' },
];

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-2xl font-bold text-white">PipMate</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700"
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex items-center">
              <div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-white">{session?.user?.name || session?.user?.email}</p>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-2xl font-bold text-white">PipMate</h1>
              </div>
              <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-600 mx-4 mt-2 rounded-full"></div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{session?.user?.name || session?.user?.email}</p>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-xs font-medium text-gray-400 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
