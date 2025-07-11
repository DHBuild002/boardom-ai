import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { NewTaskGenerator } from './components/NewTaskGenerator';
import { LoginScreen } from './components/LoginScreen';
import { generateTasks, isApiConfigured } from './services/geminiService';
import { onAuthChange, logout, saveBoardToFirestore, loadBoardFromFirestore } from './services/userService';
import { initialBoard } from './data/initialData';
import type { Board, Task } from './types';

const LoadingScreen: React.FC<{ message: string }> = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#101010]">
        <p className="text-white text-xl animate-pulse">{message}</p>
    </div>
);

function App() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [apiConfigured] = useState(() => isApiConfigured());
  const [authState, setAuthState] = useState<{
    isLoading: boolean;
    user: { uid: string; email: string | null; } | null;
  }>({
    isLoading: true,
    user: null,
  });

  const isInitialLoad = useRef(true);

  // Handle Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setAuthState({ isLoading: true, user });
        const userBoard = await loadBoardFromFirestore(user.uid);
        setBoard(userBoard || initialBoard);
        isInitialLoad.current = true; // Flag to prevent immediate save on load
        setAuthState({ isLoading: false, user });
      } else {
        setAuthState({ isLoading: false, user: null });
        setBoard(initialBoard);
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Save board to Firestore whenever it changes
  useEffect(() => {
    if (authState.user && !authState.isLoading) {
      if (isInitialLoad.current) {
        // Skip the very first effect run after loading data
        isInitialLoad.current = false;
        return;
      }
      saveBoardToFirestore(authState.user.uid, board);
    }
  }, [board, authState.user, authState.isLoading]);

  const handleLogout = () => {
    logout();
  };
  
  const handleGenerateTasks = useCallback(async (prompt: string, type: 'single' | 'full') => {
    setIsLoadingTasks(true);
    const newTasksData = await generateTasks(prompt, type);
    
    setBoard(prevBoard => {
      const newTasks: Record<string, Task> = {};
      const newTaskIds: string[] = [];

      newTasksData.forEach((taskData, index) => {
        if (taskData.title === 'Configuration Error' || taskData.title === 'AI Generation Failed') {
            alert(`${taskData.title}: ${taskData.description}`);
            return;
        }
        const id = `task-${Date.now()}-${index}`;
        newTasks[id] = { id, ...taskData };
        newTaskIds.push(id);
      });
      
      if(newTaskIds.length === 0) {
        setIsLoadingTasks(false);
        return prevBoard;
      }

      const todoColumn = prevBoard.columns['todo'];
      
      return {
        ...prevBoard,
        tasks: { ...prevBoard.tasks, ...newTasks },
        columns: {
          ...prevBoard.columns,
          'todo': {
            ...todoColumn,
            taskIds: [...newTaskIds, ...todoColumn.taskIds]
          }
        }
      };
    });

    setIsLoadingTasks(false);
  }, []);

  const moveTask = useCallback((taskId: string, targetColumnId: string) => {
    setBoard(prevBoard => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));
        let sourceColumnId: string | null = null;
        
        // Find source column and remove task
        for (const colId of newBoard.columnOrder) {
            const column = newBoard.columns[colId];
            const taskIndex = column.taskIds.indexOf(taskId);
            if (taskIndex > -1) {
                sourceColumnId = colId;
                column.taskIds.splice(taskIndex, 1);
                break;
            }
        }

        if (!sourceColumnId) return prevBoard;

        // Add task to target column
        const targetColumn = newBoard.columns[targetColumnId];
        targetColumn.taskIds.push(taskId);
        
        return newBoard;
    });
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      tasks: {
        ...prevBoard.tasks,
        [updatedTask.id]: updatedTask
      }
    }));
  }, []);

  const handleResetBoard = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the board? All tasks will be permanently removed.')) {
        setBoard(initialBoard);
    }
  }, []);

  if (authState.isLoading) {
    return <LoadingScreen message="Loading session..." />;
  }

  if (!authState.user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Header onLogout={handleLogout} onResetBoard={handleResetBoard} user={authState.user} />
      <main>
        {!apiConfigured && (
            <div className="p-4 text-center bg-yellow-900/50 text-yellow-300">
                Warning: Gemini API key is not configured. AI features will not work.
            </div>
        )}
        <NewTaskGenerator onGenerate={handleGenerateTasks} isLoading={isLoadingTasks} />
        <KanbanBoard board={board} moveTask={moveTask} updateTask={updateTask} />
      </main>
      <footer className="text-center p-6 text-gray-600 text-sm">
        <p>Powered by Gemini API. Built for the modern developer.</p>
      </footer>
    </div>
  );
}

export default App;
