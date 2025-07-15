import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <style>
        {`
          @keyframes singleCardFlow {
            /* Start in TODO */
            0% { transform: translateX(0px); opacity: 1; }
            25% { transform: translateX(0px); opacity: 1; }
            
            /* Move to IN PROGRESS */
            35% { transform: translateX(220px); opacity: 1; }
            45% { transform: translateX(220px); opacity: 1; }
            
            /* Move to DONE */
            55% { transform: translateX(440px); opacity: 1; }
            75% { transform: translateX(440px); opacity: 1; }
            
            /* Fade out in DONE */
            85% { transform: translateX(440px); opacity: 0.5; }
            100% { transform: translateX(440px); opacity: 0; }
          }

          @keyframes promptGeneration {
            /* Hidden initially */
            0% { transform: scale(1); opacity: 0; border-width: 2px; }
            34% { transform: scale(1); opacity: 0; border-width: 2px; }
            
            /* Appear and emphasize in IN PROGRESS */
            35% { transform: scale(1.1); opacity: 1; border-width: 3px; }
            50% { transform: scale(1.1); opacity: 1; border-width: 3px; }
            
            /* Return to normal before moving */
            54% { transform: scale(1); opacity: 1; border-width: 2px; }
            55% { transform: scale(1); opacity: 0; border-width: 2px; }
            100% { transform: scale(1); opacity: 0; border-width: 2px; }
          }

          @keyframes completedTask {
            /* Hidden initially */
            0% { opacity: 0; }
            54% { opacity: 0; }
            
            /* Appear in DONE */
            55% { opacity: 1; }
            75% { opacity: 1; }
            
            /* Fade out */
            85% { opacity: 0.5; }
            100% { opacity: 0; }
          }

          .moving-card {
            animation: singleCardFlow 12s ease-in-out infinite;
          }

          .ai-prompt-card {
            animation: promptGeneration 12s ease-in-out infinite;
            background: linear-gradient(135deg, #10219F, #FE5F55);
            border: 3px solid transparent;
            background-clip: padding-box;
          }

          .completed-card {
            animation: completedTask 12s ease-in-out infinite;
          }
        `}
      </style>

      {/* Workflow Board */}
      <div className="bg-[#BDD5EA] bg-opacity-20 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          {/* TODO Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">TODO</h3>
            <div className="space-y-4">
              <div className="moving-card bg-[#10219F] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium absolute top-16 left-4 right-4 z-50">
                Build user authentication
              </div>
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs relative z-10">
                Add database schema
              </div>
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs relative z-10">
                Create API endpoints
              </div>
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">IN PROGRESS</h3>
            <div className="space-y-4 relative z-10">
              <div className="ai-prompt-card text-[#F7F7FF] p-3 rounded-lg text-xs font-medium absolute top-16 left-4 right-4 opacity-0">
                🤖 Generating AI Prompt...
              </div>
            </div>
          </div>

          {/* DONE Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">DONE</h3>
            <div className="space-y-4">
              <div className="completed-card bg-[#000000] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium absolute top-16 left-4 right-4 opacity-0">
                ✅ Auth implementation ready
              </div>
              <div className="bg-[#000000] text-[#F7F7FF] p-3 rounded-lg text-xs relative z-10">
                Setup project structure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[#000000] opacity-80 font-medium">
        Transform tasks into structured AI prompts that guide your development workflow
      </p>
    </div>
  );
};