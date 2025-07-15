import React from 'react';
import { WaitlistForm } from './components/WaitlistForm';
import { AnimatedWorkflowIcon } from './components/icons';
import { isFirebaseConfigured } from './firebaseConfig';

function App() {
  const firebaseConfigured = isFirebaseConfigured();

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-6">
            boardom<span className="inline-block w-4 h-4 bg-black ml-1 mb-2"></span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            The AI-powered Kanban board
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Streamline your development workflow with intelligent task generation, 
            actionable AI prompts, and seamless project management.
          </p>

          {/* Animated Demo */}
          <div className="mb-12">
            <AnimatedWorkflowIcon />
          </div>

          {/* Configuration Warning */}
          {!firebaseConfigured && (
            <div className="bg-amber-900/50 text-amber-300 p-4 rounded-lg mb-8 max-w-md mx-auto">
              <p className="font-bold mb-2">⚠️ Configuration Required</p>
              <p className="text-sm">
                Please update your Firebase configuration in <code>firebaseConfig.ts</code> to enable waitlist functionality.
              </p>
            </div>
          )}

          {/* Waitlist Form */}
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">Get Early Access</h2>
            <p className="text-gray-400 mb-6">
              Be the first to experience boardom and revolutionize your workflow.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose boardom?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-red-500 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Tasks</h3>
              <p className="text-gray-400">
                Generate comprehensive project backlogs from simple descriptions using advanced AI.
              </p>
            </div>

            <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-red-500 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Smart Prompts</h3>
              <p className="text-gray-400">
                Get actionable, context-aware prompts to accelerate your development workflow.
              </p>
            </div>

            <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-red-500 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Seamless Flow</h3>
              <p className="text-gray-400">
                Intuitive Kanban interface designed for modern development teams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-600 text-sm border-t border-gray-800">
        <p>Powered by AI. Built for the modern developer.</p>
      </footer>
    </div>
  );
}

export default App;