import React, { useState } from 'react';
import { Button } from './common/Button';
import { AnimatedWorkflowIcon } from './icons';
import { Login } from './auth/Login';
import { SignUp } from './auth/SignUp';
import { isFirebaseConfigured } from '../../firebaseConfig';

type AuthMode = 'login' | 'signup';

export const LoginScreen: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const firebaseConfigured = isFirebaseConfigured();

    const NotConfiguredMessage = () => (
      <div className="bg-amber-900/50 text-amber-300 p-4 rounded-lg text-center">
        <p className="font-bold mb-2">Service Not Configured</p>
        <p className="text-sm">
          Firebase credentials are missing. Please add your configuration to <code>firebaseConfig.ts</code> to enable authentication.
        </p>
      </div>
    );

    return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#101010] text-white">
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-7xl font-black tracking-tighter mb-2 text-center">
                Bahn<span className="text-red-600">.</span>
            </h1>
            <p className="text-lg text-gray-400 text-center mb-8">
                The AI-powered Kanban board.
            </p>

            <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-8 space-y-6">
              {!firebaseConfigured ? (
                <NotConfiguredMessage />
              ) : (
                <>
                  <div className="flex justify-center border-b border-gray-700">
                    <button 
                      onClick={() => setMode('login')} 
                      className={`px-6 py-2 text-lg font-semibold transition-colors ${mode === 'login' ? 'text-white border-b-2 border-red-600' : 'text-gray-500'}`}
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setMode('signup')}
                      className={`px-6 py-2 text-lg font-semibold transition-colors ${mode === 'signup' ? 'text-white border-b-2 border-red-600' : 'text-gray-500'}`}
                    >
                      Sign Up
                    </button>
                  </div>
                  
                  {mode === 'login' ? <Login /> : <SignUp />}
                </>
              )}
            </div>
            
            <div className="mt-8">
                <AnimatedWorkflowIcon />
            </div>
        </div>
    </div>
  );
};