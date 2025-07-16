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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-[#F7F7FF] border border-[#BDD5EA] text-[#000000] rounded-lg p-4 text-lg focus:ring-2 focus:ring-[#FE5F55] focus:border-[#FE5F55] transition-all placeholder-gray-500"
            disabled={isLoading}
            required
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-[#BDD5EA] bg-opacity-30 text-[#000000] border border-[#BDD5EA]' 
              : 'bg-[#FE5F55] bg-opacity-20 text-[#000000] border border-[#FE5F55]'
          }`}>
            {message.text}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading || !email.trim()}
          className="w-full !py-4 !text-lg !bg-[#F7F7FF] !text-[#10219F] !border-2 !border-[#F7F7FF] hover:!bg-[#BDD5EA] hover:!text-[#000000]"
        >
          {isLoading ? 'Joining Waitlist...' : 'Join Waitlist'}
        </Button>
      </form>

      <p className="text-[#BDD5EA] text-sm text-center mt-4">
        We'll notify you when boardom is ready for early access.
      </p>
    </div>
  );
};