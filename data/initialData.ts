import type { Board } from '../types';

export const initialBoard: Board = {
  tasks: {},
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
};
