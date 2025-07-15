import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <style>
        {`
          @keyframes cardSequentialFlow {
            /* Phase 1: Start in TODO (0-20%) */
            0% { 
              transform: translateX(0px); 
              opacity: 1; 
              background: #10219F;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }
            20% { 
              transform: translateX(0px); 
              opacity: 1; 
              background: #10219F;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }

            /* Phase 2: Move to IN PROGRESS (20-30%) */
            30% { 
              transform: translateX(220px); 
              opacity: 1; 
              background: #10219F;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }

            /* Phase 3: AI Transformation in IN PROGRESS (30-60%) */
            35% { 
              transform: translateX(220px) scale(1.05); 
              opacity: 1; 
              background: linear-gradient(135deg, #10219F, #FE5F55);
              color: #F7F7FF;
              border: 3px solid #FE5F55;
              box-shadow: 0 0 20px rgba(254, 95, 85, 0.3);
            }
            50% { 
              transform: translateX(220px) scale(1.05); 
              opacity: 1; 
              background: linear-gradient(135deg, #10219F, #FE5F55);
              color: #F7F7FF;
              border: 3px solid #FE5F55;
              box-shadow: 0 0 20px rgba(254, 95, 85, 0.3);
            }
            60% { 
              transform: translateX(220px) scale(1); 
              opacity: 1; 
              background: #000000;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }

            /* Phase 4: Move to DONE (60-70%) */
            70% { 
              transform: translateX(440px); 
              opacity: 1; 
              background: #000000;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }

            /* Phase 5: Stay in DONE (70-90%) */
            90% { 
              transform: translateX(440px); 
              opacity: 1; 
              background: #000000;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }

            /* Phase 6: Fade out in DONE (90-100%) */
            100% { 
              transform: translateX(440px); 
              opacity: 0; 
              background: #000000;
              color: #F7F7FF;
              border: 2px solid transparent;
              box-shadow: none;
            }
          }

          @keyframes textTransition {
            /* Original text in TODO */
            0% { opacity: 1; }
            20% { opacity: 1; }
            30% { opacity: 1; }
            
            /* Fade out original text */
            32% { opacity: 0; }
            
            /* AI processing text appears */
            35% { opacity: 1; }
            50% { opacity: 1; }
            
            /* Fade out AI text */
            58% { opacity: 0; }
            
            /* Completed text appears */
            60% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }

          @keyframes aiProcessingText {
            0% { opacity: 0; }
            32% { opacity: 0; }
            35% { opacity: 1; }
            50% { opacity: 1; }
            58% { opacity: 0; }
            100% { opacity: 0; }
          }

          @keyframes completedText {
            0% { opacity: 0; }
            58% { opacity: 0; }
            60% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }

          .moving-card {
            animation: cardSequentialFlow 15s ease-in-out infinite;
            position: absolute;
            top: 64px;
            left: 16px;
            right: 16px;
            z-index: 100;
            border-radius: 8px;
            padding: 12px;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            transition: all 0.3s ease;
          }

          .original-text {
            animation: textTransition 15s ease-in-out infinite;
          }

          .ai-processing-text {
            animation: aiProcessingText 15s ease-in-out infinite;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
          }

          .completed-text {
            animation: completedText 15s ease-in-out infinite;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
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
              {/* Static placeholder cards */}
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
            {/* Empty space for moving card */}
          </div>

          {/* DONE Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">DONE</h3>
            <div className="space-y-4">
              {/* Static completed card */}
              <div className="bg-[#000000] text-[#F7F7FF] p-3 rounded-lg text-xs relative z-10">
                Setup project structure
              </div>
            </div>
          </div>
        </div>

        {/* Moving Card with Dynamic Text */}
        <div className="moving-card">
          <div className="original-text">
            Build user authentication
          </div>
          <div className="ai-processing-text">
            🤖 Generating AI Prompt...
          </div>
          <div className="completed-text">
            ✅ Auth implementation ready
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