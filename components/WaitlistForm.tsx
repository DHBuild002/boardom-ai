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
            className="w-full bg-white border border-blue-200 text-[#00171f] rounded-lg p-4 text-lg focus:ring-2 focus:ring-[#007ea7] focus:border-[#007ea7] transition-all placeholder-gray-400"
            disabled={isLoading}
            required
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading || !email.trim()}
          className="w-full !py-4 !text-lg !bg-white !text-[#00a8e8] !border-2 !border-white hover:!bg-blue-50 hover:!text-[#003459]"
        >
          {isLoading ? 'Joining Waitlist...' : 'Join Waitlist'}
        </Button>
      </form>

      <p className="text-gray-400 text-sm text-center mt-4">
        We'll notify you when boardom is ready for early access.
      </p>
    </div>
  );
};