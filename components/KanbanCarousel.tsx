import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <style>
        {`
          @keyframes promptFlow1 {
            0% { transform: translateX(0px); opacity: 1; }
            20% { transform: translateX(0px); opacity: 1; }
            40% { transform: translateX(200px); opacity: 0.8; }
            60% { transform: translateX(200px); opacity: 0.8; }
            80% { transform: translateX(400px); opacity: 0.6; }
            100% { transform: translateX(400px); opacity: 0.3; }
          }

          @keyframes promptFlow2 {
            0% { transform: translateX(0px); opacity: 1; }
            25% { transform: translateX(0px); opacity: 1; }
            45% { transform: translateX(200px); opacity: 0.8; }
            65% { transform: translateX(200px); opacity: 0.8; }
            85% { transform: translateX(400px); opacity: 0.6; }
            100% { transform: translateX(400px); opacity: 0.3; }
          }

          @keyframes promptFlow3 {
            0% { transform: translateX(0px); opacity: 1; }
            30% { transform: translateX(0px); opacity: 1; }
            50% { transform: translateX(200px); opacity: 0.8; }
            70% { transform: translateX(200px); opacity: 0.8; }
            90% { transform: translateX(400px); opacity: 0.6; }
            100% { transform: translateX(400px); opacity: 0.3; }
          }

          @keyframes cardAppear {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0px); opacity: 1; }
          }

          .prompt-flow-1 {
            animation: promptFlow1 9s ease-in-out 0s infinite;
          }

          .prompt-flow-2 {
            animation: promptFlow2 9s ease-in-out 3s infinite;
          }

          .prompt-flow-3 {
            animation: promptFlow3 9s ease-in-out 6s infinite;
          }

          .card-appear-1 {
            animation: cardAppear 0.5s ease-out 3s both;
          }

          .card-appear-2 {
            animation: cardAppear 0.5s ease-out 6s both;
          }

          .card-appear-3 {
            animation: cardAppear 0.5s ease-out 9s both;
          }
        `}
      </style>

      {/* Workflow Board */}
      <div className="bg-[#BDD5EA] bg-opacity-20 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          {/* TODO Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA]">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">TODO</h3>
            <div className="space-y-4">
              <div className="prompt-flow-1 bg-[#10219F] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium">
                Build user auth
              </div>
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs">
                Add database
              </div>
              <div className="bg-[#BDD5EA] bg-opacity-50 text-[#000000] p-3 rounded-lg text-xs">
                Create API
              </div>
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA]">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">IN PROGRESS</h3>
            <div className="space-y-4">
              <div className="card-appear-1 bg-[#FE5F55] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium opacity-0">
                Build user auth
              </div>
              <div className="prompt-flow-2 bg-[#10219F] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium">
                Add database
              </div>
            </div>
          </div>

          {/* DONE Column */}
          <div className="bg-[#F7F7FF] rounded-lg p-4 min-h-[220px] border border-[#BDD5EA]">
            <h3 className="font-bold text-[#000000] mb-4 text-center text-sm">DONE</h3>
            <div className="space-y-4">
              <div className="card-appear-2 bg-[#000000] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium opacity-0">
                Add database
              </div>
              <div className="prompt-flow-3 bg-[#10219F] text-[#F7F7FF] p-3 rounded-lg text-xs font-medium">
                Create API
              </div>
              <div className="bg-[#000000] text-[#F7F7FF] p-3 rounded-lg text-xs">
                Setup project
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[#000000] opacity-80 font-medium">
        Transform vague prompts into structured AI workflows that eliminate endless circles
      </p>
    </div>
  );
};