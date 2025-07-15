import React from 'react';
import { WaitlistForm } from './components/WaitlistForm';
import { KanbanCarousel } from './components/KanbanCarousel.tsx';
import { isFirebaseConfigured } from './firebaseConfig';

function App() {
  const firebaseConfigured = isFirebaseConfigured();

  return (
    <div className="min-h-screen bg-white text-[#00171f]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight">
            boardom<span className="inline-block w-2 h-2 bg-[#00171f] ml-1 mb-1"></span>
          </h1>
          <a 
            href="https://x.com/totalboardom" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#007ea7] hover:text-[#003459] transition-colors font-medium"
          >
            Follow @totalboardom
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            AI-Powered Workflow
            <br />
            <span className="text-[#007ea7]">Without the Boredom</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#003459] mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your development process with intelligent Kanban boards that guide AI development 
            to limit the boredom of endless prompting circles.
          </p>

          {/* Dynamic Carousel */}
          <div className="mb-16">
            <KanbanCarousel />
          </div>

          {/* Configuration Warning */}
          {!firebaseConfigured && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 max-w-md mx-auto">
              <p className="font-bold mb-2">⚠️ Configuration Required</p>
              <p className="text-sm">
                Please update your Firebase configuration in <code>firebaseConfig.ts</code> to enable waitlist functionality.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-[#00a8e8] text-white rounded-2xl p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-2">Ready to End the Cycle?</h3>
            <p className="text-blue-100 mb-6">
              Join the waitlist and be first to experience boardom's intelligent workflow management.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why boardom Changes Everything
          </h2>
          <p className="text-xl text-[#003459] text-center mb-16 max-w-3xl mx-auto">
            Stop spinning your wheels with repetitive AI prompts. boardom's intelligent Kanban system 
            guides your development workflow with purpose and precision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#007ea7] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#00171f]">Smart Task Generation</h3>
              <p className="text-[#003459]">
                Transform vague ideas into structured, actionable tasks with AI that understands development workflows.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#00a8e8] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#00171f]">Guided AI Prompts</h3>
              <p className="text-[#003459]">
                Break free from endless prompting circles with contextual, actionable AI guidance tailored to your current task.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#003459] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#00171f]">Intelligent Kanban</h3>
              <p className="text-[#003459]">
                Visual workflow management that adapts to your development style and keeps projects moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00171f] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            boardom<span className="inline-block w-2 h-2 bg-white ml-1 mb-1"></span>
          </h3>
          <p className="text-gray-300 mb-6">
            AI-powered workflow management for the modern developer.
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://x.com/totalboardom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00a8e8] hover:text-white transition-colors"
            >
              Follow on X
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 boardom. Built to eliminate the boredom of endless AI prompting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;