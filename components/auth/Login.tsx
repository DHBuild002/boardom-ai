import React, { useState } from 'react';
import { Button } from '../common/Button';
import { signIn } from '../../services/userService';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      // On success, App.tsx will handle the redirect
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full space-y-4">
      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</p>}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 text-left">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 text-left">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full !py-2.5">
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};