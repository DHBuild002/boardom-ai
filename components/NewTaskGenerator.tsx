
import React, { useState } from 'react';
import { Button } from './common/Button';
import { SparklesIcon } from './icons';

type GenerationType = 'single' | 'full';

interface NewTaskGeneratorProps {
  onGenerate: (prompt: string, type: GenerationType) => void;
  isLoading: boolean;
}

export const NewTaskGenerator: React.FC<NewTaskGeneratorProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState<GenerationType>('full');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt, generationType);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 md:p-8">
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <SparklesIcon className="text-red-500 h-7 w-7" />
                    Generate New Tasks
                </h2>
            </div>
            
            <p className="text-gray-400 mb-6">Describe your project goal or a specific feature improvement, and let AI build your backlog.</p>

            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-[#101010] border border-gray-700 text-gray-200 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    rows={3}
                    placeholder="e.g., 'Build a real-time chat feature with notifications' or 'Improve database query performance'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <label className="text-gray-300 font-medium">Generation Mode:</label>
                        <div className="flex gap-2 p-1 bg-[#101010] rounded-md">
                            <Button 
                                type="button" 
                                onClick={() => setGenerationType('full')}
                                className={`text-xs !px-3 !py-1 ${generationType === 'full' ? '!bg-red-600' : 'bg-transparent hover:!bg-gray-700'}`}
                            >
                                Full Project Deck
                            </Button>
                            <Button 
                                type="button" 
                                onClick={() => setGenerationType('single')}
                                className={`text-xs !px-3 !py-1 ${generationType === 'single' ? '!bg-red-600' : 'bg-transparent hover:!bg-gray-700'}`}
                            >
                                Single Card
                            </Button>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading || !prompt.trim()} className="w-full sm:w-auto">
                        {isLoading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
};