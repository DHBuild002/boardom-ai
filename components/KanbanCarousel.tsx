import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <style>
        {`
          @keyframes cardMovement {
            /* Phase 1: Start in TODO (0-30%) */
            0% { 
              transform: translateX(0px); 
              opacity: 1;
            }
            30% { 
              transform: translateX(0px); 
              opacity: 1;
            }

            /* Phase 2: Move to IN PROGRESS (30-50%) */
            50% { 
              transform: translateX(220px); 
              opacity: 1;
            }

            /* Phase 3: Stay in IN PROGRESS (50-80%) */
            80% { 
              transform: translateX(220px); 
              opacity: 1;
            }

            /* Phase 4: Move to DONE (80-100%) */
            100% { 
              transform: translateX(440px); 
              opacity: 1;
            }
          }

          @keyframes gradientBorder {
            /* Subtle border in TODO */
            0% { 
              border: 2px solid #BDD5EA;
              box-shadow: 0 2px 4px rgba(189, 213, 234, 0.2);
            }
            30% { 
              border: 2px solid #BDD5EA;
              box-shadow: 0 2px 4px rgba(189, 213, 234, 0.2);
            }

            /* Animated gradient border in IN PROGRESS */
            50% { 
              border: 3px solid #FF6B6B;
              box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
            }
            65% { 
              border: 3px solid #4ECDC4;
              box-shadow: 0 4px 20px rgba(78, 205, 196, 0.3);
            }
            80% { 
              border: 3px solid #FF6B6B;
              box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
            }

            /* Completed border in DONE */
            100% { 
              border: 2px solid #000000;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
          }

          @keyframes floatingText {
            /* Hidden in TODO */
            0% { opacity: 0; transform: translateY(10px) scale(0.95); }
            30% { opacity: 0; transform: translateY(10px) scale(0.95); }

            /* Appear in IN PROGRESS with smooth scale */
            40% { opacity: 1; transform: translateY(0px) scale(1); }
            70% { opacity: 1; transform: translateY(0px) scale(1); }
            80% { opacity: 1; transform: translateY(0px) scale(1); }

            /* Fade out when moving to DONE */
            90% { opacity: 0; transform: translateY(-5px) scale(0.95); }
            100% { opacity: 0; transform: translateY(-5px) scale(0.95); }
          }

          @keyframes cardBackground {
            /* Blue background in TODO */
            0% { background: #10219F; color: #F7F7FF; }
            30% { background: #10219F; color: #F7F7FF; }

            /* Stays blue in IN PROGRESS */
            50% { background: #10219F; color: #F7F7FF; }
            80% { background: #10219F; color: #F7F7FF; }

            /* Black background in DONE */
            100% { background: #000000; color: #F7F7FF; }
          }

          @keyframes cardScale {
            /* Normal size in TODO */
            0% { transform: translateX(0px) scale(1); }
            30% { transform: translateX(0px) scale(1); }

            /* Slightly larger in IN PROGRESS */
            35% { transform: translateX(220px) scale(1.05); }
            45% { transform: translateX(220px) scale(1.02); }
            75% { transform: translateX(220px) scale(1.02); }
            80% { transform: translateX(220px) scale(1); }

            /* Normal size in DONE */
            100% { transform: translateX(440px) scale(1); }
          }

          .moving-card {
            animation: 
              cardScale 6s cubic-bezier(0.4, 0, 0.2, 1) infinite,
              gradientBorder 6s cubic-bezier(0.4, 0, 0.2, 1) infinite,
              cardBackground 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            position: absolute;
            top: 80px;
            left: 16px;
            width: 180px;
            height: 44px;
            z-index: 100;
            border-radius: 10px;
            padding: 12px;
            font-size: 13px;
            font-weight: 600;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(1px);
          }

          .floating-text {
            animation: floatingText 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            position: absolute;
            top: 40px;
            left: 16px;
            width: 180px;
            z-index: 101;
            font-size: 11px;
            font-weight: 700;
            text-align: center;
            color: #FF6B6B;
            opacity: 0;
            text-shadow: 0 1px 3px rgba(0,0,0,0.2);
            letter-spacing: 0.5px;
          }
        `}
      </style>

      {/* Workflow Board */}
      <div className="bg-[#BDD5EA] bg-opacity-20 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          {/* TODO Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[160px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">TODO</h3>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[160px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">IN PROGRESS</h3>
          </div>

          {/* DONE Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[160px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">DONE</h3>
          </div>
        </div>

        {/* Floating Text */}
        <div className="floating-text">
          AI is crafting your prompt...
        </div>

        {/* Moving Card */}
        <div className="moving-card">
          Build user authentication
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[#000000] opacity-80 font-medium">
        Transform tasks into structured AI prompts that guide your development workflow
      </p>
    </div>
  );
};