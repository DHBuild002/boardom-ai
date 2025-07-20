import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#000000]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#BDD5EA]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold tracking-tight text-[#10219F] flex items-baseline hover:opacity-80 transition-opacity">
            boardom<span className="inline-block w-2 h-2 bg-[#000000] ml-1"></span>
          </a>
          <nav>
            <a 
              href="/" 
              className="text-[#10219F] hover:text-[#FE5F55] transition-colors font-medium"
            >
              ← Back to Home
            </a>
          </nav>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#BDD5EA] rounded-xl p-8">
            <div className="prose prose-sm max-w-none">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#10219F] mb-2">PRIVACY NOTICE</h1>
                <p className="text-gray-500 text-sm">Last updated __________</p>
              </div>
              
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                <p>
                  This Privacy Notice for <strong>boardom</strong> ('<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might access, collect, store, use, and/or share ('<strong>process</strong>') your personal information when you use our services ('<strong>Services</strong>'), including when you:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Visit our website at <a href="https://totalboardom.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#10219F] hover:underline">https://totalboardom.co.uk</a> or any website of ours that links to this Privacy Notice</li>
                  <li>Use Total Boardom - Kanban AI. A Kanban tool for prompts. Break your project down into easy to manage prompts.</li>
                  <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                </ul>
                
                <p>
                  <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
                </p>
                
                <div className="bg-[#F7F7FF] border border-[#BDD5EA] rounded-lg p-6 mt-8">
                  <h2 className="text-xl font-bold text-[#10219F] mb-4">SUMMARY OF KEY POINTS</h2>
                  <p className="text-xs italic mb-4">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
                  
                  <div className="space-y-4">
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
                      <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting <a href="https://find.totalboardom.co.uk/account/preferences" target="_blank" rel="noopener noreferrer" className="text-[#10219F] hover:underline">https://find.totalboardom.co.uk/account/preferences</a>, or by contacting us.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-[#10219F] mb-4">TABLE OF CONTENTS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <p><a href="#infocollect" className="text-[#10219F] hover:underline">1. WHAT INFORMATION DO WE COLLECT?</a></p>
                      <p><a href="#infouse" className="text-[#10219F] hover:underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></p>
                      <p><a href="#legalbases" className="text-[#10219F] hover:underline">3. WHAT LEGAL BASES DO WE RELY ON?</a></p>
                      <p><a href="#whoshare" className="text-[#10219F] hover:underline">4. WHEN AND WITH WHOM DO WE SHARE?</a></p>
                      <p><a href="#3pwebsites" className="text-[#10219F] hover:underline">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></p>
                      <p><a href="#cookies" className="text-[#10219F] hover:underline">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></p>
                      <p><a href="#ai" className="text-[#10219F] hover:underline">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></p>
                    </div>
                    <div className="space-y-2">
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
                
                <div className="mt-8 pt-6 border-t border-[#BDD5EA]">
                  <p className="text-xs text-gray-500">
                    For the complete privacy policy with all sections and detailed information, please visit our full privacy policy page. This summary covers the key points but the complete document contains additional important details about your privacy rights and our data practices.
                  </p>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Contact us: <a href="mailto:policies@totalboardom.co.uk" className="text-[#10219F] hover:underline">policies@totalboardom.co.uk</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};