
import React from 'react';
import { Column as ColumnType, Task } from '../types';
import { Card } from './Card';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  moveTask: (taskId: string, targetColumnId: string) => void;
  updateTask: (updatedTask: Task) => void;
  nextColumnId?: string;
  prevColumnId?: string;
}

export const Column: React.FC<ColumnProps> = ({ column, tasks, moveTask, updateTask, nextColumnId, prevColumnId }) => {
  return (
    <div className="flex flex-col w-full md:w-1/3 bg-[#1c1c1c] rounded-lg p-4 border border-gray-800">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
        <h3 className="font-bold text-lg text-white">{column.title}</h3>
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">{tasks.length}</span>
      </div>
      <div className="flex-grow min-h-[200px] overflow-y-auto pr-2">
        {tasks.map(task => (
            <Card 
                key={task.id} 
                task={task} 
                currentColumn={column}
                moveTask={moveTask}
                updateTask={updateTask}
                nextColumnId={nextColumnId}
                prevColumnId={prevColumnId}
            />
        ))}
      </div>
    </div>
  );
};
