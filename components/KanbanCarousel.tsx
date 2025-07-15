import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <style>
        {`
          @keyframes cardMovement {
            /* Phase 1: Start in TODO (0-25%) */
            0% { 
              transform: translateX(0px); 
              opacity: 1;
            }
            25% { 
              transform: translateX(0px); 
              opacity: 1;
            }

            /* Phase 2: Move to IN PROGRESS (25-37.5%) */
            37.5% { 
              transform: translateX(220px); 
              opacity: 1;
            }

            /* Phase 3: Stay in IN PROGRESS (37.5-87.5%) */
            87.5% { 
              transform: translateX(220px); 
              opacity: 1;
            }

            /* Phase 4: Move to DONE (87.5-100%) */
            100% { 
              transform: translateX(440px); 
              opacity: 1;
            }
          }

          @keyframes gradientBorder {
            /* No border in TODO */
            0% { 
              border: 2px solid #BDD5EA;
              box-shadow: none;
            }
            25% { 
              border: 2px solid #BDD5EA;
              box-shadow: none;
            }

            /* Pulsing gradient border in IN PROGRESS */
            37.5% { 
              border: 3px solid #FF6B6B;
              box-shadow: 0 0 15px rgba(255, 107, 107, 0.4);
            }
            50% { 
              border: 3px solid #4ECDC4;
              box-shadow: 0 0 15px rgba(78, 205, 196, 0.4);
            }
            62.5% { 
              border: 3px solid #FF6B6B;
              box-shadow: 0 0 15px rgba(255, 107, 107, 0.4);
            }
            75% { 
              border: 3px solid #4ECDC4;
              box-shadow: 0 0 15px rgba(78, 205, 196, 0.4);
            }
            87.5% { 
              border: 3px solid #FF6B6B;
              box-shadow: 0 0 15px rgba(255, 107, 107, 0.4);
            }

            /* Normal border in DONE */
            100% { 
              border: 2px solid #000000;
              box-shadow: none;
            }
          }

          @keyframes floatingText {
            /* Hidden in TODO */
            0% { opacity: 0; transform: translateY(10px); }
            25% { opacity: 0; transform: translateY(10px); }

            /* Appear in IN PROGRESS */
            37.5% { opacity: 1; transform: translateY(0px); }
            87.5% { opacity: 1; transform: translateY(0px); }

            /* Hidden in DONE */
            100% { opacity: 0; transform: translateY(10px); }
          }

          @keyframes cardBackground {
            /* Blue background in TODO */
            0% { background: #10219F; color: #F7F7FF; }
            25% { background: #10219F; color: #F7F7FF; }

            /* Stays blue in IN PROGRESS */
            37.5% { background: #10219F; color: #F7F7FF; }
            87.5% { background: #10219F; color: #F7F7FF; }

            /* Black background in DONE */
            100% { background: #000000; color: #F7F7FF; }
          }

          .moving-card {
            animation: 
              cardMovement 4s ease-in-out infinite,
              gradientBorder 4s ease-in-out infinite,
              cardBackground 4s ease-in-out infinite;
            position: absolute;
            top: 148px;
            left: 16px;
            width: 180px;
            height: 40px;
            z-index: 100;
            border-radius: 8px;
            padding: 12px;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .floating-text {
            animation: floatingText 4s ease-in-out infinite;
            position: absolute;
            top: 64px;
            left: 16px;
            width: 180px;
            z-index: 101;
            font-size: 11px;
            font-weight: 600;
            text-align: center;
            color: #FF6B6B;
            opacity: 0;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          }
        `}
      </style>

      {/* Workflow Board */}
      <div className="bg-[#BDD5EA] bg-opacity-20 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          {/* TODO Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[180px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">TODO</h3>
            <div className="space-y-3">
              {/* Static cards in TODO only */}
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs relative z-10">
                Add database schema
              </div>
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs relative z-10">
            <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs relative z-10">
              </div>
            </div>
          </div>

          {/* IN PROGRESS Column - Empty for animation */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[180px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">IN PROGRESS</h3>
            {/* Empty - card will move here */}
          </div>

          {/* DONE Column - Empty for animation */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[180px] border border-[#BDD5EA] relative">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">DONE</h3>
            {/* Empty - card will move here */}
          </div>
        </div>

        {/* Floating Text */}
        <div className="floating-text">
          Turning into the perfect prompt...
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
  )
}