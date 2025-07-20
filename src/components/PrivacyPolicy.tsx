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

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#000000]">Privacy Policy</h1>
          
          <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-xl p-8">
            <p className="text-lg text-[#000000] opacity-80 text-center">
              Privacy Policy content will be added here.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-[#F7F7FF] py-12 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="text-2xl font-bold mb-4 text-[#F7F7FF] flex items-baseline justify-center hover:opacity-80 transition-opacity">
            boardom<span className="inline-block w-2 h-2 bg-[#F7F7FF] ml-1"></span>
          </Link>
          <p className="text-[#BDD5EA] text-sm">
            © 2025 boardom. Built to structure AI development workflows.
          </p>
        </div>
      </footer>
    </div>
  );
};