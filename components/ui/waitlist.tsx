'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { addToWaitlist } from '../../services/waitlistService';

type Mode = 'light' | 'dark';

declare global {
  interface Window {
    grecaptcha: any;
    recaptchaReady: boolean;
  }
}

interface Props {
  mode: Mode;
}

export const Component = ({ mode }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecaptchaApiReady, setIsRecaptchaApiReady] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const isWebContainer = window.location.hostname.includes('webcontainer-api.io');
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const siteKeyConfigured = !!siteKey;

  useEffect(() => {
    if (!isWebContainer && siteKeyConfigured && !recaptchaLoaded) {
      window.onRecaptchaLoaded = () => {
        setIsRecaptchaApiReady(true);
        console.log('reCAPTCHA v3 API loaded successfully');
      };

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=${siteKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      setRecaptchaLoaded(true);
      console.log('reCAPTCHA v3 script loaded dynamically');

      return () => {
        const existingScript = document.querySelector(`script[src*="recaptcha"]`);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [isWebContainer, siteKeyConfigured, siteKey, recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      return;
    }
    
    setIsLoading(true);
    
    let recaptchaToken: string | undefined;
    
    if (!isWebContainer && siteKeyConfigured && isRecaptchaApiReady && window.grecaptcha) {
      try {
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });
        console.log('reCAPTCHA v3 token obtained');
      } catch (error) {
        console.error('reCAPTCHA v3 execution failed:', error);
      }
    }
    
    const result = await addToWaitlist(email, recaptchaToken);
    
    if (result.success) {
      setSubmitted(true);
      setEmail('');
    }
    setIsLoading(false);
  };

  const isEmailValid = email.trim() !== '' && email.includes('@');
  const canSubmit = isEmailValid && (isWebContainer || (siteKeyConfigured && isRecaptchaApiReady));

  const containerClasses = mode === 'dark' 
    ? 'bg-background border border-accent' 
    : 'bg-white';

  const titleClasses = mode === 'dark' 
    ? 'text-primary' 
    : 'text-gray-800';

  const textClasses = mode === 'dark' 
    ? 'text-black' 
    : 'text-gray-500';

  return (
    <div className="flex justify-center items-center py-20">
      <InView triggerOnce threshold={0.5}>
        {({ inView, ref }) => (
          <div ref={ref} className={`${containerClasses} w-25 max-w-xl mx-auto rounded-xl ${submitted ? 'p-1' : 'p-6'} z-50`}>
            {!submitted ? (
              <div>
                <div className="text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
                    transition={{ duration: 0.5 }}
                    className={`${titleClasses} text-3xl font-bold mb-4`}
                  >
                    Join our waitlist
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`${textClasses} text-sm mb-6 opacity-80`}
                  >
                    Be the first to access boardom's intelligent workflow system. Enter your email below to join the waitlist.
                  </motion.p>
                </div>
                
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center justify-center space-y-4"
                  onSubmit={handleSubmit}
                >
                  {isWebContainer ? (
                    <div className="info-box info-box-blue">
                      ℹ️ reCAPTCHA is disabled in development environment due to dynamic domain.
                    </div>
                  ) : siteKeyConfigured ? (
                    <div className="info-box info-box-green">
                      🛡️ This form is protected by reCAPTCHA v3 and the Google Privacy Policy and Terms of Service apply.
                    </div>
                  ) : (
                    <div className="info-box info-box-yellow">
                      ⚠️ reCAPTCHA is not configured. Please add your site key to continue.
                    </div>
                  )}
                  <div className="flex w-full items-center">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 w-full bg-background appearance-none rounded-l-full py-2 px-4 text-black leading-tight focus-outline border border-accent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <motion.button
                      type="submit"
                      disabled={!canSubmit || isLoading}
                      className={`bg-primary text-white py-2 px-6 rounded-r-full focus-outline transition-all border border-accent ${
                        canSubmit && !isLoading 
                          ? 'cursor-pointer hover:bg-secondary' 
                          : 'cursor-not-allowed opacity-60'
                      }`}
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
                  className={`${titleClasses} text-2xl font-bold mb-4 mt-8`}
                >
                  You are on the waitlist
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${textClasses} mb-6 opacity-80`}
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
                    className={`${titleClasses} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}
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