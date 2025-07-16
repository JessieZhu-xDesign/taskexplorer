'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddTaskForm from '@/components/task/add-task-form';
import TaskList from '@/components/task/task-list';
import type { Task } from '@/lib/types';
import { suggestCompletionDate } from '@/ai/flows/suggest-completion-date';
import { suggestEmoji } from '@/ai/flows/suggest-emoji';
import { useToast } from '@/hooks/use-toast';
import { getTasks, addTask, updateTask, deleteTask } from '@/lib/firebase';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (text: string) => {
    setIsAddingTask(true);
    try {
      const { emoji } = await suggestEmoji({ taskDescription: text });
      const newTask: Omit<Task, 'id'> = {
        text,
        emoji,
        completed: false,
      };
      const id = await addTask(newTask);
      setTasks((current) => [{ ...newTask, id }, ...current]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error adding task',
        description: 'Could not add task to Firebase.',
      });
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    await updateTask(id, { completed: updated.completed });
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleUpdateTask = async (id: string, newText: string) => {
    await updateTask(id, { text: newText });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const handleSuggestDate = async (id: string) => {
    const taskToSuggest = tasks.find((task) => task.id === id);
    if (!taskToSuggest) return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isSuggestingDate: true } : task
      )
    );

    try {
      const remainingTasks = tasks.filter((t) => !t.completed).length;
      const currentDay = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
      });

      const result = await suggestCompletionDate({
        taskDescription: taskToSuggest.text,
        currentDay,
        remainingTasks,
        otherContext:
          'This is for a young child, so the suggestion should be soon and encouraging.',
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                suggestedCompletionDate: result.suggestedCompletionDate,
                reasoning: result.reasoning,
              }
            : task
        )
      );
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! The magic wand is sleeping.',
        description: 'Couldn\'t get a date suggestion. Please try again later.',
      });
    } finally {
      setTasks(
        (currentTasks) =>
          currentTasks.map((task) =>
            task.id === id ? { ...task, isSuggestingDate: false } : task
          )
      );
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-center text-4xl sm:text-5xl font-bold text-primary drop-shadow-sm">
            Task Explorers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm onAddTask={handleAddTask} isAddingTask={isAddingTask} />
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onSuggestDate={handleSuggestDate}
          />
        </CardContent>
      </Card>
    </main>
  );
}
