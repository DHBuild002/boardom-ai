import React from 'react';
import { Component as WaitlistComponent } from '../../components/ui/waitlist';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#000000]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#BDD5EA]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#10219F] flex items-baseline">
            boardom<span className="inline-block w-2 h-2 bg-[#000000] ml-1"></span>
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-[#000000]">
            Free Yourself from Prompting <span className="text-[#10219F]">boardom</span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#000000] mb-12 max-w-3xl mx-auto leading-relaxed opacity-80">
            Direct your AI effectively. This kanban tool helps you prioritize what's important, letting AI focus on a feature at a time with generative prompting.
          </p>

          {/* CTA Section */}
          <div className="bg-[#10219F] text-[#F7F7FF] rounded-2xl p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-2 text-[#F7F7FF]">Ready to Structure Your AI Workflow?</h3>
            <p className="text-[#BDD5EA] mb-6">
              Join the waitlist and be first to experience boardom's intelligent prompting pipeline.
            </p>
            <div className="bg-[#10219F] -m-8 rounded-2xl">
              <WaitlistComponent mode="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#BDD5EA] bg-opacity-30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#000000]">
            Why boardom Changes Everything
          </h2>
          <p className="text-xl text-[#000000] opacity-80 text-center mb-16 max-w-3xl mx-auto">
            Stop spinning your wheels with repetitive AI prompts. boardom's intelligent workflow system 
            guides your development process with structured prompting pipelines.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#10219F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#F7F7FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Smart Task Generation</h3>
              <p className="text-[#000000] opacity-80">
                Transform vague ideas into structured, actionable prompts with AI that understands development workflows.
              </p>
            </div>

            <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#FE5F55] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#F7F7FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Guided Prompting Pipeline</h3>
              <p className="text-[#000000] opacity-80">
                Break free from endless prompting circles with contextual, structured AI guidance tailored to your workflow stage.
              </p>
            </div>

            <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#F7F7FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#000000]">Intelligent Workflow</h3>
              <p className="text-[#000000] opacity-80">
                Visual workflow management that structures your AI development process and keeps projects moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-[#F7F7FF] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#F7F7FF] flex items-baseline justify-center">
            boardom<span className="inline-block w-2 h-2 bg-[#F7F7FF] ml-1"></span>
          </h3>
          <p className="text-[#BDD5EA] mb-6">
            AI-powered workflow management for structured development.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://x.com/totalboardom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#F7F7FF] text-[#000000] px-6 py-3 rounded-lg font-semibold hover:bg-[#BDD5EA] transition-all duration-300 flex items-center gap-3 border border-[#BDD5EA]"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="text-[#000000]"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-[#BDD5EA] border-opacity-30">
            <div className="flex justify-center space-x-6 mb-4">
              <a 
                href="/privacy-policy" 
                className="text-[#BDD5EA] hover:text-[#F7F7FF] transition-colors text-sm"
              >
                Privacy Policy
              </a>
            </div>
            <p className="text-[#BDD5EA] text-sm">
              © 2025 boardom. Built to structure AI development workflows.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};