import React, { useState } from 'react';
import { Button } from '../common/Button';
import { signUp } from '../../services/userService';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await signUp(email, password);
      // On success, App.tsx will handle the redirect
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="w-full space-y-4">
      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</p>}
      
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1 text-left">Email Address</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
           placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="signup-password"  className="block text-sm font-medium text-gray-300 mb-1 text-left">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="At least 6 characters"
        />
      </div>

       <div>
        <label htmlFor="confirm-password"  className="block text-sm font-medium text-gray-300 mb-1 text-left">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full !py-2.5">
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};