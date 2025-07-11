import React from 'react';
import { Board, Task } from '../types';
import { Column } from './Column';

interface KanbanBoardProps {
  board: Board;
  moveTask: (taskId: string, targetColumnId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ board, moveTask, updateTask }) => {

  return (
    <div className="p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {board.columnOrder.map((columnId, index) => {
          const column = board.columns[columnId];
          const tasks = column.taskIds.map(taskId => board.tasks[taskId]);
          const prevColumnId = index > 0 ? board.columnOrder[index - 1] : undefined;
          const nextColumnId = index < board.columnOrder.length - 1 ? board.columnOrder[index + 1] : undefined;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              moveTask={moveTask}
              updateTask={updateTask}
              prevColumnId={prevColumnId}
              nextColumnId={nextColumnId}
            />
          );
        })}
      </div>
    </div>
  );
};