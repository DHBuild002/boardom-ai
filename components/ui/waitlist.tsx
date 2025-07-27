'use client' // This directive is typically used for React Server Components, but kept here as it was in the original file.
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { addToWaitlist } from '../../services/waitlistService';

type Mode = 'light' | 'dark';

declare global {
  interface Window {
    grecaptcha: any; // Google reCAPTCHA object
  }
}

interface Props {
  mode: Mode;
}

export const Component = ({ mode }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderRecaptcha = () => {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      
      if (!siteKey) {
        console.warn('reCAPTCHA site key is not configured. Please add VITE_RECAPTCHA_SITE_KEY to your .env file or Netlify environment variables.');
        return;
      }
      
      if (recaptchaContainerRef.current && window.grecaptcha && !recaptchaContainerRef.current.dataset.recaptchaRendered) {
        window.grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setRecaptchaToken(token);
          },
          'expired-callback': () => {
            setRecaptchaToken(null);
          },
        });
        recaptchaContainerRef.current.dataset.recaptchaRendered = 'true';
      }
    };

    // Check if grecaptcha is already loaded, otherwise it will be loaded by the script in index.html
    if (window.grecaptcha) {
      renderRecaptcha();
    }
    // No cleanup needed for grecaptcha.render as it manages its own lifecycle.
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      return;
    }
    
    if (!recaptchaToken) {
      // This case should ideally be prevented by the disabled state of the button
      console.warn("reCAPTCHA token is missing. Please complete the CAPTCHA.");
      return;
    }
    
    setIsLoading(true);
    const result = await addToWaitlist(email, recaptchaToken);
    
    if (result.success) {
      setSubmitted(true);
      setEmail('');
      setRecaptchaToken(null); // Reset token after successful submission
      if (window.grecaptcha) {
        window.grecaptcha.reset(); // Reset the reCAPTCHA widget
      }
    }
    setIsLoading(false);
  };

  const isEmailValid = email.trim() !== '' && email.includes('@'); // Helper for email validation
  const siteKeyConfigured = !!import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const canSubmit = isEmailValid && (siteKeyConfigured ? recaptchaToken !== null : true);
  const canSubmit = isEmailValid && (siteKeyConfigured ? recaptchaToken !== null : true);

  return (
    <div className="flex justify-center items-center py-20">
      <InView triggerOnce threshold={0.5}>
        {({ inView, ref }) => (
          <div ref={ref} className={`${mode === 'dark' ? 'bg-[#F7F7FF] border border-[#BDD5EA]' : 'bg-white'} w-full max-w-xl mx-auto rounded-xl ${submitted ? 'p-1' : 'p-6'} z-50`}> {/* max-w-xl for outer box */}
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
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 w-full bg-[#F7F7FF] appearance-none rounded-l-full py-2 px-4 text-[#000000] leading-tight focus:outline-none focus:ring-2 focus:ring-[#10219F] border border-[#BDD5EA]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  {/* Google reCAPTCHA widget container */}
                  {siteKeyConfigured ? (
                    <div ref={recaptchaContainerRef} className="mt-4 mb-2"></div>
                  ) : (
                    <div className="mt-4 mb-2 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
                      ⚠️ reCAPTCHA is not configured. Please add your site key to continue.
                    </div>
                  )}
                    <div ref={recaptchaContainerRef} className="mt-4 mb-2"></div>
                  ) : (
                    <div className="mt-4 mb-2 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
                      ⚠️ reCAPTCHA is not configured. Please add your site key to continue.
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className={`bg-[#10219F] text-[#F7F7FF] py-[6px] px-6 rounded-r-full focus:outline-none transition-all duration-300 border border-[#BDD5EA] ${canSubmit && !isLoading ? 'cursor-pointer hover:bg-[#FE5F55]' : 'cursor-not-allowed opacity-60'}`}
                  >
                    {isLoading ? 'Joining...' : 'Join'}
                  </motion.button>
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