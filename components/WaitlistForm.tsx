import React, { useState } from 'react';
import { Button } from './common/Button';
import { addToWaitlist } from '../services/waitlistService';

// Debug component to show environment info
const DebugInfo: React.FC<{ show: boolean }> = ({ show }) => {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDebugInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/debug-waitlist');
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setDebugData({ error: error.message });
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
      <button 
        onClick={fetchDebugInfo}
        className="mb-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Check Debug Info'}
      </button>
      {debugData && (
        <pre className="overflow-auto max-h-40 text-xs">
          {JSON.stringify(debugData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showDebug, setShowDebug] = useState(false);

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

      {/* Debug toggle - only show in development or if there's an error */}
      {(import.meta.env.DEV || message?.type === 'error') && (
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="mt-2 text-xs text-gray-500 underline"
        >
          {showDebug ? 'Hide' : 'Show'} Debug Info
        </button>
      )}

      <DebugInfo show={showDebug} />

      <p className="text-[#000000] opacity-60 text-xs text-center mt-3">
        We'll notify you when boardom is ready for early access.
      </p>
    </div>
  );
};