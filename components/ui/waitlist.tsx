'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { addToWaitlist } from '../../services/waitlistService';

type Mode = 'light' | 'dark';

interface Props {
  mode: Mode;
}

export const Component = ({ mode }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      return;
    }
    
    // Show CAPTCHA if email is valid and CAPTCHA hasn't been shown yet
    if (!showCaptcha) {
      setShowCaptcha(true);
      return;
    }
    
    // Check if CAPTCHA is completed
    if (!captchaChecked) {
      return;
    }
    
    setIsLoading(true);
    const result = await addToWaitlist(email);
    
    if (result.success) {
      setSubmitted(true);
      setEmail('');
    }
    setIsLoading(false);
  };

  const isEmailValid = email.trim() !== '' && email.includes('@');
  const canSubmit = isEmailValid && (!showCaptcha || captchaChecked);

  return (
    <div className="flex justify-center items-center py-20">
      <InView triggerOnce threshold={0.5}>
        {({ inView, ref }) => (
          <div ref={ref} className={`${mode === 'dark' ? 'bg-[#F7F7FF] border border-[#BDD5EA]' : 'bg-white'} w-full max-w-xl mx-auto rounded-xl ${submitted ? 'p-1' : 'p-6'} z-50`}>
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
                  className="flex items-center justify-center"
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
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className={`bg-[#10219F] text-[#F7F7FF] py-[6px] px-6 rounded-r-full focus:outline-none transition-all duration-300 border border-[#BDD5EA] ${canSubmit && !isLoading ? 'cursor-pointer hover:bg-[#FE5F55]' : 'cursor-not-allowed opacity-60'}`}
                  >
                    {isLoading ? 'Joining...' : showCaptcha ? 'Join' : 'Continue'}
                  </motion.button>
                </motion.form>
                
                {/* CAPTCHA Section */}
                {showCaptcha && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 bg-[#F7F7FF] border border-[#BDD5EA] rounded-lg"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={captchaChecked}
                          onChange={(e) => setCaptchaChecked(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          captchaChecked 
                            ? 'bg-[#10219F] border-[#10219F]' 
                            : 'bg-white border-[#BDD5EA] hover:border-[#10219F]'
                        }`}>
                          {captchaChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`ml-3 text-sm ${mode === 'dark' ? 'text-[#000000]' : 'text-gray-700'}`}>
                          I'm not a robot
                        </span>
                      </label>
                      <div className="flex items-center justify-center w-8 h-8 bg-[#10219F] rounded">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <p className={`text-xs ${mode === 'dark' ? 'text-[#000000]' : 'text-gray-500'} text-center mt-2 opacity-70`}>
                      Please verify that you are human
                    </p>
                  </motion.div>
                )}
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