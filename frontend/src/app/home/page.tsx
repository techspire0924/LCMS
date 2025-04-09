'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logout } from '../utils/auth';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is logged in using our auth utility
  useEffect(() => {
    if (!isAuthenticated()) {
      // If not authenticated, redirect to login
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Function to handle logout
  const handleLogout = () => {
    // Use the logout function from auth utility
    logout();
    // Redirect to login
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Home Page</h2>
          <p className="text-gray-600">
            You have successfully logged in with username: <span className="font-semibold">root</span>
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">What's Next?</h3>
            <p className="text-gray-600 mb-4">
              This is a simple example of a protected page. In a real application, you would:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Implement proper authentication with JWT or session tokens</li>
              <li>Store user data in a database</li>
              <li>Create more protected routes and components</li>
              <li>Add user roles and permissions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
