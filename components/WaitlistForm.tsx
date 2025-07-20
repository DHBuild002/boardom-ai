import React, { useState } from 'react';
import { Button } from './common/Button';
import { addToWaitlist } from '../services/waitlistService';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const result = await addToWaitlist(email);
    
    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });

    if (result.success) {
      setEmail('');
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-[#F7F7FF] border border-[#BDD5EA] text-[#000000] rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#FE5F55] focus:border-[#FE5F55] transition-all placeholder-gray-500"
            disabled={isLoading}
            required
          />
        </div>

        {message && (
          <div className={`p-2 rounded-lg text-xs ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading || !email.trim()}
          className="w-full !py-3 !text-sm"
        >
          {isLoading ? 'Joining Waitlist...' : 'Join Waitlist'}
        </Button>
      </form>

      <p className="text-white opacity-60 text-xs text-center mt-3">
        We'll notify you when boardom is ready for early access.
      </p>
    </div>
  );
};