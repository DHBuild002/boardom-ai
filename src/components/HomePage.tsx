import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#000000] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Logo/Brand */}
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-[#10219F] flex items-baseline justify-center">
          boardom<span className="inline-block w-3 h-3 bg-[#000000] ml-2"></span>
        </h1>

        {/* Coming Soon Message */}
        <div className="bg-white border border-[#BDD5EA] rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#000000]">
            Coming Soon...
          </h2>
          
          <p className="text-lg md:text-xl text-[#000000] opacity-80 mb-8 leading-relaxed">
            We are working hard to get a secure and working site back up and running shortly. 
            Thank you for your patience and understanding.
          </p>

          <div className="bg-[#BDD5EA] bg-opacity-30 rounded-xl p-6 mb-8">
            <p className="text-[#000000] font-medium">
              For enquiries, please contact:
            </p>
            <a 
              href="mailto:support@totalboardom.co.uk" 
              className="text-[#10219F] font-bold text-lg hover:text-[#FE5F55] transition-colors duration-300"
            >
              support@totalboardom.co.uk
            </a>
          </div>

          {/* Loading animation */}
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-[#10219F] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#FE5F55] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-[#BDD5EA] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-[#000000] opacity-60 text-sm">
            © 2025 boardom. AI-powered workflow management.
          </p>
        </div>
      </div>
    </div>
  );
};