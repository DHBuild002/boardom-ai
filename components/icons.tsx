import React from 'react';

export const SparklesIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/>
        <path d="M5 22v-5"/>
        <path d="m19 22-1.5-3.8"/>
        <path d="M3 10H2"/>
        <path d="M21 10h-1"/>
    </svg>
);

export const CopyIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M23 4v6h-6" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export const AnimatedWorkflowIcon = () => (
    <>
        <style>
            {`
                @keyframes move-card {
                    /* === Drop in ToDo (Light Red) === */
                    0%   { transform: translate(7px, 5px); opacity: 0; fill: #f87171; } /* red-400 */
                    10%  { transform: translate(7px, 18px); opacity: 1; }
                    25%  { transform: translate(7px, 18px); opacity: 1; }

                    /* === Move to In Progress (Brightest Red) === */
                    35%  { transform: translate(47px, 18px); fill: #dc2626; } /* red-600 */
                    55%  { transform: translate(47px, 18px); }
                    
                    /* === Move to Done (Duller Red) === */
                    65%  { transform: translate(87px, 18px); fill: #991b1b; } /* red-800 */
                    85%  { transform: translate(87px, 18px); opacity: 1; }

                    /* === Fade out in Done === */
                    100% { transform: translate(87px, 18px); opacity: 0; }
                }

                /* Using the 'animation' shorthand property to include the fill-mode and prevent flicker */
                .card-1 { animation: move-card 4.5s ease-in-out 0s   infinite both; }
                .card-2 { animation: move-card 4.5s ease-in-out 1.5s infinite both; }
                .card-3 { animation: move-card 4.5s ease-in-out 3s   infinite both; }
            `}
        </style>
        <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            {/* Static background columns to represent the board stages */}
            <rect x="2" y="10" width="30" height="40" rx="5" fill="#2a2a2a" />
            <rect x="42" y="10" width="30" height="40" rx="5" fill="#2a2a2a" />
            <rect x="82" y="10" width="30" height="40" rx="5" fill="#2a2a2a" />
            
            {/* Animated Cards */}
            <rect className="card-1" width="20" height="25" rx="3" />
            <rect className="card-2" width="20" height="25" rx="3" />
            <rect className="card-3" width="20" height="25" rx="3" />
        </svg>
    </>
);