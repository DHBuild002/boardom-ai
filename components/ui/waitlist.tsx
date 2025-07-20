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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
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

  return (
    <div className="flex justify-center items-center py-20">
      <InView triggerOnce threshold={0.5}>
        {({ inView, ref }) => (
          <div ref={ref} className={`${mode === 'dark' ? 'bg-[#F7F7FF] border border-[#BDD5EA]' : 'bg-white'} w-full max-w-md mx-auto rounded-xl ${submitted ? 'p-1' : 'p-6'} z-50`}>
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
                    disabled={!isEmailValid || isLoading}
                    className={`bg-[#10219F] text-[#F7F7FF] py-[6px] px-6 rounded-r-full focus:outline-none transition-all duration-300 border border-[#BDD5EA] ${isEmailValid && !isLoading ? 'cursor-pointer hover:bg-[#FE5F55]' : 'cursor-not-allowed opacity-60'}`}
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
      
      {/* Privacy Policy Section */}
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-white border border-[#BDD5EA] rounded-xl p-6">
          <div className="prose prose-sm max-w-none">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#10219F] mb-2">PRIVACY NOTICE</h1>
              <p className="text-gray-500 text-sm">Last updated __________</p>
            </div>
            
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                This Privacy Notice for <strong>boardom</strong> ('<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might access, collect, store, use, and/or share ('<strong>process</strong>') your personal information when you use our services ('<strong>Services</strong>'), including when you:
              </p>
              
              <ul className="list-disc pl-6 space-y-1">
                <li>Visit our website at <a href="https://totalboardom.co.uk" target="_blank" className="text-[#10219F] hover:underline">https://totalboardom.co.uk</a> or any website of ours that links to this Privacy Notice</li>
                <li>Use Total Boardom - Kanban AI. A Kanban tool for prompts. Break your project down into easy to manage prompts.</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>
              
              <p>
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
              </p>
              
              <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-lg p-4 mt-6">
                <h2 className="text-lg font-bold text-[#10219F] mb-3">SUMMARY OF KEY POINTS</h2>
                <p className="text-xs italic mb-3">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
                
                <div className="space-y-3">
                  <div>
                    <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                  </div>
                  
                  <div>
                    <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
                  </div>
                  
                  <div>
                    <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
                  </div>
                  
                  <div>
                    <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
                  </div>
                  
                  <div>
                    <p><strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                  </div>
                  
                  <div>
                    <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
                  </div>
                  
                  <div>
                    <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting <a href="https://find.totalboardom.co.uk/account/preferences" target="_blank" className="text-[#10219F] hover:underline">https://find.totalboardom.co.uk/account/preferences</a>, or by contacting us.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-bold text-[#10219F] mb-3">TABLE OF CONTENTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p><a href="#infocollect" className="text-[#10219F] hover:underline">1. WHAT INFORMATION DO WE COLLECT?</a></p>
                    <p><a href="#infouse" className="text-[#10219F] hover:underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></p>
                    <p><a href="#legalbases" className="text-[#10219F] hover:underline">3. WHAT LEGAL BASES DO WE RELY ON?</a></p>
                    <p><a href="#whoshare" className="text-[#10219F] hover:underline">4. WHEN AND WITH WHOM DO WE SHARE?</a></p>
                    <p><a href="#3pwebsites" className="text-[#10219F] hover:underline">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></p>
                    <p><a href="#cookies" className="text-[#10219F] hover:underline">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></p>
                    <p><a href="#ai" className="text-[#10219F] hover:underline">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></p>
                  </div>
                  <div className="space-y-1">
                    <p><a href="#inforetain" className="text-[#10219F] hover:underline">8. HOW LONG DO WE KEEP YOUR INFORMATION?</a></p>
                    <p><a href="#infosafe" className="text-[#10219F] hover:underline">9. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></p>
                    <p><a href="#privacyrights" className="text-[#10219F] hover:underline">10. WHAT ARE YOUR PRIVACY RIGHTS?</a></p>
                    <p><a href="#DNT" className="text-[#10219F] hover:underline">11. CONTROLS FOR DO-NOT-TRACK FEATURES</a></p>
                    <p><a href="#uslaws" className="text-[#10219F] hover:underline">12. DO US RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></p>
                    <p><a href="#policyupdates" className="text-[#10219F] hover:underline">13. DO WE MAKE UPDATES TO THIS NOTICE?</a></p>
                    <p><a href="#contact" className="text-[#10219F] hover:underline">14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#BDD5EA]">
                <p className="text-xs text-gray-500">
                  For the complete privacy policy with all sections and detailed information, please visit our full privacy policy page. This summary covers the key points but the complete document contains additional important details about your privacy rights and our data practices.
                </p>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Contact us: <a href="mailto:policies@totalboardom.co.uk" className="text-[#10219F] hover:underline">policies@totalboardom.co.uk</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};