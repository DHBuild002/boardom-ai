import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#000000]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#BDD5EA]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#10219F] flex items-baseline hover:opacity-80 transition-opacity">
            boardom<span className="inline-block w-2 h-2 bg-[#000000] ml-1"></span>
          </Link>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#000000]">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-white border border-[#BDD5EA] rounded-xl p-8 mb-8">
              <p className="text-[#000000] opacity-80 mb-6">
                Last updated: [Date]
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#10219F]">Information We Collect</h2>
                <p className="text-[#000000] opacity-80 mb-4">
                  [Add information about what data you collect]
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#10219F]">How We Use Your Information</h2>
                <p className="text-[#000000] opacity-80 mb-4">
                  [Add information about how you use the collected data]
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#10219F]">Data Protection</h2>
                <p className="text-[#000000] opacity-80 mb-4">
                  [Add information about how you protect user data]
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#10219F]">Contact Us</h2>
                <p className="text-[#000000] opacity-80 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at [contact information].
                </p>
              </section>
            </div>

            <div className="text-center">
              <Link 
                to="/" 
                className="bg-[#10219F] text-[#F7F7FF] px-6 py-3 rounded-lg font-semibold hover:bg-[#FE5F55] transition-all duration-300 inline-flex items-center gap-2"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] text-[#F7F7FF] py-12 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#F7F7FF] flex items-baseline justify-center">
            boardom<span className="inline-block w-2 h-2 bg-[#F7F7FF] ml-1"></span>
          </h3>
          <p className="text-[#BDD5EA] mb-6">
            AI-powered workflow management for structured development.
          </p>
          <div className="mt-8 pt-8 border-t border-[#BDD5EA] border-opacity-30">
            <p className="text-[#BDD5EA] text-sm">
              © 2025 boardom. Built to structure AI development workflows.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};