import React from 'react';

export const ComingSoon: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        {/* Logo/Brand */}
        <h1 className="text-4xl md-text-5xl font-black mb-8 text-primary brand-logo justify-center">
          boardom<span className="brand-dot"></span>
        </h1>

        {/* Coming Soon Message */}
        <div className="coming-soon-card">
          <h2 className="text-3xl md-text-4xl font-bold mb-6 text-black">
            Coming Soon...
          </h2>
          
          <p className="text-lg md-text-xl text-black opacity-80 mb-8 leading-relaxed">
            We are working hard to get a secure and working site back up and running shortly. 
            Thank you for your patience and understanding.
          </p>

          <div className="contact-info">
            <p className="text-black font-medium">
              For enquiries, please contact:
            </p>
            <a 
              href="mailto:support@totalboardom.co.uk" 
              className="contact-link"
            >
              support@totalboardom.co.uk
            </a>
          </div>

          {/* Loading animation */}
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-black opacity-60 text-sm">
            © 2025 boardom. AI-powered workflow management.
          </p>
        </div>
      </div>
    </div>
  );
};