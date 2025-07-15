import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <style>
        {`
          @keyframes promptFlow {
            0% { transform: translateX(0px) translateY(0px); opacity: 1; }
            25% { transform: translateX(140px) translateY(-5px); opacity: 0.8; }
            50% { transform: translateX(280px) translateY(0px); opacity: 0.8; }
            75% { transform: translateX(420px) translateY(-5px); opacity: 0.8; }
            100% { transform: translateX(560px) translateY(0px); opacity: 0.3; }
          }

          @keyframes cardAppear {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0px); opacity: 1; }
          }

          .prompt-flow-1 {
            animation: promptFlow 8s ease-in-out 0s infinite;
          }

          .prompt-flow-2 {
            animation: promptFlow 8s ease-in-out 2s infinite;
          }

          .prompt-flow-3 {
            animation: promptFlow 8s ease-in-out 4s infinite;
          }

          .card-appear-1 {
            animation: cardAppear 0.5s ease-out 2s both;
          }

          .card-appear-2 {
            animation: cardAppear 0.5s ease-out 4s both;
          }

          .card-appear-3 {
            animation: cardAppear 0.5s ease-out 6s both;
          }
        `}
      </style>

      {/* Workflow Board */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-4 gap-4">
          {/* Prompt Ideas Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center text-sm">Prompt Ideas</h3>
            <div className="space-y-3">
              <div className="prompt-flow-1 bg-[#007ea7] text-white p-3 rounded-lg text-xs font-medium">
                "Build user auth"
              </div>
              <div className="bg-gray-200 p-3 rounded-lg text-xs">
                "Add database"
              </div>
              <div className="bg-gray-200 p-3 rounded-lg text-xs">
                "Create API"
              </div>
            </div>
          </div>

          {/* Structured Prompts Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center text-sm">Structured</h3>
            <div className="space-y-3">
              <div className="card-appear-1 bg-[#00a8e8] text-white p-3 rounded-lg text-xs font-medium opacity-0">
                "Build user auth"
              </div>
              <div className="prompt-flow-2 bg-[#007ea7] text-white p-3 rounded-lg text-xs font-medium">
                "Add database"
              </div>
            </div>
          </div>

          {/* AI Processing Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center text-sm">AI Processing</h3>
            <div className="space-y-3">
              <div className="card-appear-2 bg-[#003459] text-white p-3 rounded-lg text-xs font-medium opacity-0">
                "Add database"
              </div>
              <div className="prompt-flow-3 bg-[#007ea7] text-white p-3 rounded-lg text-xs font-medium">
                "Create API"
              </div>
            </div>
          </div>

          {/* Completed Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center text-sm">Completed</h3>
            <div className="space-y-3">
              <div className="card-appear-3 bg-green-600 text-white p-3 rounded-lg text-xs font-medium opacity-0">
                "Create API"
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg text-xs">
                "Setup project"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[#003459] font-medium">
        Transform vague prompts into structured AI workflows that eliminate endless circles
      </p>
    </div>
  );
};