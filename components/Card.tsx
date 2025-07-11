import React, { useState, useCallback } from 'react';
import { Task, Column } from '../types';
import { generateActionablePrompt } from '../services/geminiService';
import { Button } from './common/Button';
import { SparklesIcon, CopyIcon, CheckIcon } from './icons';

interface CardProps {
  task: Task;
  currentColumn: Column;
  moveTask: (taskId: string, targetColumnId: string) => void;
  updateTask: (updatedTask: Task) => void;
  nextColumnId?: string;
  prevColumnId?: string;
}

const ActionablePromptModal: React.FC<{ prompt: string; onClose: () => void }> = ({ prompt, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[#1c1c1c] border border-gray-700 rounded-lg shadow-xl w-full max-w-2xl p-6 text-gray-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <SparklesIcon className="text-red-500" />
                        AI Generated Prompt
                    </h3>
                    <Button variant="ghost" onClick={onClose} className="!p-1 h-8 w-8">&times;</Button>
                </div>
                <div className="bg-black rounded-md p-4 max-h-[60vh] overflow-y-auto relative prose prose-invert prose-sm">
                    <pre className="whitespace-pre-wrap font-mono text-gray-300">{prompt}</pre>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <Button onClick={handleCopy} variant="secondary">
                        {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <CopyIcon className="h-5 w-5" />}
                        {copied ? 'Copied!' : 'Copy Prompt'}
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export const Card: React.FC<CardProps> = ({ task, currentColumn, moveTask, updateTask, nextColumnId, prevColumnId }) => {
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const handleGeneratePrompt = useCallback(async () => {
    setIsLoadingPrompt(true);
    const generatedPrompt = await generateActionablePrompt(task);
    updateTask({ ...task, generatedPrompt });
    setIsLoadingPrompt(false);
    setShowPromptModal(true);
  }, [task, updateTask]);

  return (
    <>
      <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 mb-3 cursor-grab transition-shadow hover:shadow-lg hover:shadow-red-900/20 flex flex-col">
        <div className="flex-grow">
            <h4 className="font-bold text-gray-100 mb-1">{task.title}</h4>
            <p className="text-sm text-gray-400">{task.description}</p>
        </div>
        
        <div className="border-t border-gray-700 mt-4 pt-3 flex flex-wrap items-center justify-end gap-2">
            {/* Move backward button - less prominent */}
            {prevColumnId && (
                <Button
                    variant="ghost"
                    onClick={() => moveTask(task.id, prevColumnId)}
                    className="mr-auto !text-xs !p-2"
                    title={prevColumnId === 'todo' ? 'Move back to To Do' : 'Move back to In Progress'}
                    aria-label={prevColumnId === 'todo' ? 'Move back to To Do' : 'Move back to In Progress'}
                >
                    &larr; Move Back
                </Button>
            )}

            {/* AI Prompt Button (only in In Progress) */}
            {currentColumn.id === 'in-progress' && (
                <Button
                    onClick={task.generatedPrompt ? () => setShowPromptModal(true) : handleGeneratePrompt}
                    variant="secondary"
                    className="text-xs"
                    disabled={isLoadingPrompt}
                >
                    <SparklesIcon className="h-4 w-4" />
                    {isLoadingPrompt ? 'Generating...' : (task.generatedPrompt ? 'View Prompt' : 'Get AI Prompt')}
                </Button>
            )}

            {/* Primary "Move Forward" buttons */}
            {nextColumnId === 'in-progress' && (
                <Button onClick={() => moveTask(task.id, nextColumnId)} variant="secondary" className="text-xs">
                    Start Task &rarr;
                </Button>
            )}
            {nextColumnId === 'done' && (
                <Button 
                    onClick={() => moveTask(task.id, nextColumnId)}
                    variant="primary"
                    className="text-xs !bg-green-600 hover:!bg-green-700 focus:!ring-green-500"
                >
                    Complete Task &rarr;
                </Button>
            )}
        </div>
      </div>
      {showPromptModal && task.generatedPrompt && (
        <ActionablePromptModal prompt={task.generatedPrompt} onClose={() => setShowPromptModal(false)} />
      )}
    </>
  );
};