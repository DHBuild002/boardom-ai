'use client' // This directive is typically used for React Server Components, but kept here as it was in the original file.
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { addToWaitlist } from '../../services/waitlistService';

type Mode = 'light' | 'dark';

declare global {
  interface Window {
    grecaptcha: any; // Google reCAPTCHA object
    recaptchaReady: boolean; // Our custom flag
  }
}

interface Props {
  mode: Mode;
}

export const Component = ({ mode }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecaptchaApiReady, setIsRecaptchaApiReady] = useState(false); // New state for API readiness

  // Determine if running in WebContainer
  const isWebContainer = window.location.hostname.includes('webcontainer-api.io');

  useEffect(() => {
    const handleRecaptchaApiReady = () => {
      setIsRecaptchaApiReady(true);
      console.log('reCAPTCHA API is ready via event listener.');
    };

    // Only set up listener if not in WebContainer
    if (!isWebContainer) {
      document.addEventListener('recaptcha-api-ready', handleRecaptchaApiReady);
      // Initial check in case the API loaded before the component mounted
      if (window.recaptchaReady) {
        setIsRecaptchaApiReady(true);
        console.log('reCAPTCHA API was already ready on mount.');
      }
    }

    return () => {
      if (!isWebContainer) {
        document.removeEventListener('recaptcha-api-ready', handleRecaptchaApiReady);
      }
    };
  }, [isWebContainer]); // Re-run if isWebContainer changes (though unlikely in practice)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      return;
    }
    
    setIsLoading(true);
    
    let recaptchaToken: string | undefined;
    
    // Execute reCAPTCHA v3 if not in WebContainer and API is ready
    if (!isWebContainer && siteKeyConfigured && isRecaptchaApiReady && window.grecaptcha) {
      try {
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });
        console.log('reCAPTCHA v3 token obtained');
      } catch (error) {
        console.error('reCAPTCHA v3 execution failed:', error);
        // Continue without token - let the server handle it
      }
    }
    
    const result = await addToWaitlist(email, recaptchaToken);
    
    if (result.success) {
      setSubmitted(true);
      setEmail('');
    }
    setIsLoading(false);
  };

  const isEmailValid = email.trim() !== '' && email.includes('@'); // Helper for email validation
  const siteKeyConfigured = !!import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const canSubmit = isEmailValid && (isWebContainer || (siteKeyConfigured && isRecaptchaApiReady));

  return (
    <div className="flex justify-center items-center py-20">
      <InView triggerOnce threshold={0.5}>
        {({ inView, ref }) => (
          <div ref={ref} className={`${mode === 'dark' ? 'bg-[#F7F7FF] border border-[#BDD5EA]' : 'bg-white'} w-25 max-w-xl mx-auto rounded-xl ${submitted ? 'p-1' : 'p-6'} z-50`}> {/* max-w-xl for outer box */}
            {!submitted ? (
              <div>
                <div className="text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
                    transition={{ duration: 0.5 }}
                    className={`${mode === 'dark' ? 'text-[#10219F]' : 'text-gray-800'} text-3xl font-bold mb-4`}
                  >
                    Join our waitlist
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`${mode === 'dark' ? 'text-[#000000]' : 'text-gray-500'} text-sm mb-6 opacity-80`}
                  >
                    Be the first to access boardom's intelligent workflow system. Enter your email below to join the waitlist.
                  </motion.p>
                </div>
                
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center justify-center space-y-4" // Changed to flex-col for better layout with recaptcha
                  onSubmit={handleSubmit}
                >
                  {isWebContainer ? (
                    <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg text-sm text-blue-800">
                      ℹ️ reCAPTCHA is disabled in development environment due to dynamic domain.
                    </div>
                  ) : siteKeyConfigured ? (
                    <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-sm text-green-800">
                      🛡️ This form is protected by reCAPTCHA v3 and the Google Privacy Policy and Terms of Service apply.
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
                      ⚠️ reCAPTCHA is not configured. Please add your site key to continue.
                    </div>
                  )}
                <div className={`flex w-full items-center`}>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 w-full bg-[#F7F7FF] appearance-none rounded-l-full py-2 px-4 text-[#000000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#10219F] border border-[#BDD5EA]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className={`bg-[#10219F] text-[#F7F7FF] py-[6px] px-6 rounded-r-full focus:outline-none transition-all duration-300 border border-[#BDD5EA] ${canSubmit && !isLoading ? 'cursor-pointer hover:bg-[#FE5F55]' : 'cursor-not-allowed opacity-60'}`}
                  >
                    {isLoading ? 'Joining...' : 'Join'}
                  </motion.button>
                </div>
                </motion.form>
                
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`${mode === 'dark' ? 'text-[#10219F]' : 'text-gray-800'} text-2xl font-bold mb-4 mt-8`}
                >
                  You are on the waitlist
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${mode === 'dark' ? 'text-[#000000]' : 'text-gray-500'} mb-6 opacity-80`}
                >
                  Thank you for joining boardom's waitlist.<br /> We'll keep you updated.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`${mode === 'dark' ? 'text-[#10219F]' : 'text-slate-800'} size-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </InView>
    </div>
  );
};