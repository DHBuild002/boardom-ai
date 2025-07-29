import React, { useState } from 'react';
import { SparklesIcon, AnimatedWorkflowIcon } from '../../components/icons';
import { Component as WaitlistComponent } from '../ui/waitlist';

export const HomePage: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10219F] via-[#1a2fb8] to-[#FE5F55] text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-black text-white">
              boardom<span className="inline-block w-2 h-2 bg-white ml-1"></span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/privacy-policy" className="text-white hover:text-[#BDD5EA] transition-colors">
              Privacy Policy
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 md:px-8 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                AI Kanban
                <br />
                <span className="text-[#BDD5EA]">Workflow</span>
              </h2>
              <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your development process with intelligent task generation and streamlined workflow management
              </p>
            </div>

            {/* Animated Workflow Visualization */}
            <div className="mb-12">
              <AnimatedWorkflowIcon />
              <p className="text-sm text-white opacity-70 mt-4">
                Watch tasks flow through your pipeline automatically
              </p>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <SparklesIcon className="w-8 h-8 text-[#BDD5EA] mb-4 mx-auto" />
                <h3 className="text-lg font-bold mb-2">AI Task Generation</h3>
                <p className="text-sm opacity-80">
                  Generate comprehensive task lists from simple project descriptions using advanced AI
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="w-8 h-8 text-[#BDD5EA] mb-4 mx-auto flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-6h3.75m-3.75 3h3.75m-3.75 3h3.75M5.25 6.75h13.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Visual Kanban</h3>
                <p className="text-sm opacity-80">
                  Organize and track progress with intuitive drag-and-drop kanban boards
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="w-8 h-8 text-[#BDD5EA] mb-4 mx-auto flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Smart Prompts</h3>
                <p className="text-sm opacity-80">
                  Get actionable AI-generated prompts to accelerate your development workflow
                </p>
              </div>
            </div>

            {/* Waitlist Section */}
            <WaitlistComponent mode="dark" />

            {/* Demo Button */}
            <div className="mt-12">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="text-[#BDD5EA] hover:text-white transition-colors text-sm font-medium underline"
              >
                {showDemo ? 'Hide' : 'See'} how it works
              </button>
              
              {showDemo && (
                <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 max-w-3xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-bold mb-3 text-[#BDD5EA]">1. Describe Your Project</h4>
                      <p className="text-sm opacity-80 mb-4">
                        Simply tell boardom what you want to build: "Create a React todo app with user authentication"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-[#BDD5EA]">2. AI Generates Tasks</h4>
                      <p className="text-sm opacity-80 mb-4">
                        Our AI breaks down your project into actionable tasks, complete with descriptions and priorities
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-[#BDD5EA]">3. Manage Your Workflow</h4>
                      <p className="text-sm opacity-80 mb-4">
                        Drag tasks through your kanban board: To Do → In Progress → Done
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-[#BDD5EA]">4. Get Smart Prompts</h4>
                      <p className="text-sm opacity-80 mb-4">
                        Click any task to get detailed, actionable prompts for your IDE or AI assistant
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-6 border-t border-white border-opacity-20">
          <p className="text-sm opacity-70">
            © 2025 boardom. AI-powered workflow management for modern development teams.
          </p>
        </footer>
      </div>
    </div>
  );
};