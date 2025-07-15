import React from 'react';

export const KanbanCarousel: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <style>
        {`
          @keyframes robotMove {
            0% { transform: translateX(-20px) translateY(0px); }
            25% { transform: translateX(120px) translateY(-10px); }
            50% { transform: translateX(280px) translateY(0px); }
            75% { transform: translateX(400px) translateY(-10px); }
            100% { transform: translateX(520px) translateY(0px); }
          }

          @keyframes cardPickup {
            0% { transform: translateY(0px) scale(1); opacity: 1; }
            20% { transform: translateY(-15px) scale(0.95); opacity: 0.8; }
            80% { transform: translateY(-15px) scale(0.95); opacity: 0.8; }
            100% { transform: translateY(0px) scale(1); opacity: 1; }
          }

          @keyframes cardDrop {
            0% { transform: translateY(-15px) scale(0.95); opacity: 0; }
            100% { transform: translateY(0px) scale(1); opacity: 1; }
          }

          .robot-grabber {
            animation: robotMove 6s ease-in-out infinite;
          }

          .card-pickup {
            animation: cardPickup 6s ease-in-out infinite;
          }

          .card-drop-1 {
            animation: cardDrop 0.5s ease-out 1.5s both;
          }

          .card-drop-2 {
            animation: cardDrop 0.5s ease-out 3s both;
          }

          .card-drop-3 {
            animation: cardDrop 0.5s ease-out 4.5s both;
          }
        `}
      </style>

      {/* Kanban Board */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-4 gap-4">
          {/* Backlog Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center">Backlog</h3>
            <div className="space-y-3">
              <div className="card-pickup bg-[#007ea7] text-white p-3 rounded-lg text-sm font-medium">
                Setup Authentication
              </div>
              <div className="bg-gray-200 p-3 rounded-lg text-sm">
                Design Database Schema
              </div>
              <div className="bg-gray-200 p-3 rounded-lg text-sm">
                Create API Endpoints
              </div>
            </div>
          </div>

          {/* To Do Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center">To Do</h3>
            <div className="space-y-3">
              <div className="card-drop-1 bg-[#00a8e8] text-white p-3 rounded-lg text-sm font-medium opacity-0">
                Setup Authentication
              </div>
              <div className="bg-gray-200 p-3 rounded-lg text-sm">
                Build User Interface
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center">In Progress</h3>
            <div className="space-y-3">
              <div className="card-drop-2 bg-[#003459] text-white p-3 rounded-lg text-sm font-medium opacity-0">
                Setup Authentication
              </div>
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <h3 className="font-bold text-[#003459] mb-4 text-center">Done</h3>
            <div className="space-y-3">
              <div className="card-drop-3 bg-green-600 text-white p-3 rounded-lg text-sm font-medium opacity-0">
                Setup Authentication
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg text-sm">
                Project Planning
              </div>
            </div>
          </div>
        </div>

        {/* Robot Grabber */}
        <div className="relative mt-4">
          <div className="robot-grabber absolute top-0 left-0">
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#007ea7]">
              {/* Robot Body */}
              <rect x="12" y="15" width="16" height="12" rx="2" fill="currentColor" />
              {/* Robot Head */}
              <rect x="14" y="8" width="12" height="8" rx="1" fill="currentColor" />
              {/* Eyes */}
              <circle cx="17" cy="12" r="1.5" fill="white" />
              <circle cx="23" cy="12" r="1.5" fill="white" />
              {/* Grabber Arms */}
              <rect x="8" y="18" width="4" height="2" fill="currentColor" />
              <rect x="28" y="18" width="4" height="2" fill="currentColor" />
              {/* Grabber Claws */}
              <path d="M6 17 L8 19 L8 21 L6 19 Z" fill="currentColor" />
              <path d="M34 17 L32 19 L32 21 L34 19 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[#003459] font-medium">
        Watch AI intelligently move your tasks through the development pipeline
      </p>
    </div>
  );
};