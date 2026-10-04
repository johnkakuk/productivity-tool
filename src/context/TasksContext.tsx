import { createContext, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types/Task';

type NewTask = Pick<Task, 'title' | 'description' | 'priority'>;

type TasksContextValue = {
  tasks: Task[];
  addTask: (input: NewTask) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const nextId = useRef(1);

    function addTask(input: NewTask) {
        // create new task
        const task: Task = {
            ...input,
            id: String(nextId.current++),
            completed: false,
            createdAt: new Date(),
        };

        setTasks(current => [...current, task]); // Replace tasks with old list + new one
    }

    // toggle completed of task based on id
    function toggleTask(id: string) {
        setTasks(current =>
            current.map(task =>
                task.id === id // Get task with matching id
                ? { ...task, completed: !task.completed } // toggle completed
                : task
            )
        );
    }

    // delete task based on id
    function deleteTask(id: string) {
        setTasks(current =>
            current.filter(task => task.id !== id)
        )
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);

    if (context === undefined) {
        throw new Error('useTasks must be used inside TasksProvider');
    }

    return context;
}