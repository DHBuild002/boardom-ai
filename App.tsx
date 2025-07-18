import React from 'react';
import { WaitlistForm } from './components/WaitlistForm';
import { KanbanCarousel } from './components/KanbanCarousel';

function App() {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#000000]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#BDD5EA]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#10219F] flex items-baseline">
            boardom<span className="inline-block w-2 h-2 bg-[#FE5F55] ml-1"></span>
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[#000000]">
            Free Yourself from Prompting <span className="text-[#FE5F55]">boardom</span>
          </h2>
          
          <p className="text-lg text-[#000000] opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Direct your AI effectively. This kanban tool helps you prioritize what's important, letting AI focus on a feature at a time with generative prompting.
          </p>

          {/* Kanban Carousel */}
          <div className="mb-12">
            <KanbanCarousel />
          </div>

          {/* CTA Section */}
          <div className="bg-white border border-[#BDD5EA] rounded-xl p-6 max-w-md mx-auto shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-[#000000]">Ready to Structure Your AI Workflow?</h3>
            <p className="text-[#000000] opacity-70 mb-4 text-sm">
              Join the waitlist and be first to experience boardom's intelligent prompting pipeline.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#BDD5EA] bg-opacity-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#000000]">
            Why boardom Changes Everything
          </h2>
          <p className="text-lg text-[#000000] opacity-80 text-center mb-12 max-w-2xl mx-auto">
            Stop spinning your wheels with repetitive AI prompts. boardom's intelligent workflow system 
            guides your development process with structured prompting pipelines.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#BDD5EA] rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FE5F55] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#000000]">Smart Task Generation</h3>
              <p className="text-[#000000] opacity-70 text-sm">
                Transform vague ideas into structured, actionable prompts with AI that understands development workflows.
              </p>
            </div>

            <div className="bg-white border border-[#BDD5EA] rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FE5F55] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#000000]">Guided Prompting Pipeline</h3>
              <p className="text-[#000000] opacity-70 text-sm">
                Break free from endless prompting circles with contextual, structured AI guidance tailored to your workflow stage.
              </p>
            </div>

            <div className="bg-white border border-[#BDD5EA] rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FE5F55] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#000000]">Intelligent Workflow</h3>
              <p className="text-[#000000] opacity-70 text-sm">
                Visual workflow management that structures your AI development process and keeps projects moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#10219F] py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-3 flex items-baseline justify-center text-white">
            boardom<span className="inline-block w-2 h-2 bg-[#FE5F55] ml-1"></span>
          </h3>
          <p className="text-[#BDD5EA] mb-6 text-sm">
            AI-powered workflow management for structured development.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://x.com/totalboardom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#10219F] px-5 py-2 rounded-lg font-semibold hover:bg-[#BDD5EA] transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="text-[#10219F]"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-[#BDD5EA] border-opacity-30">
            <p className="text-[#BDD5EA] text-xs">
              © 2025 boardom. Built to structure AI development workflows.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;