
export interface Task {
  id: string;
  title: string;
  description: string;
  generatedPrompt?: string;
}

export interface Column {
  id:string;
  title: string;
  taskIds: string[];
}

export interface Board {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}
