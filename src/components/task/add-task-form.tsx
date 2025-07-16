'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, PlusCircle } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
  isAddingTask: boolean;
}

export default function AddTaskForm({ onAddTask, isAddingTask }: AddTaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isAddingTask) {
      onAddTask(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's your next adventure?"
        className="h-12 text-lg flex-grow bg-white focus:bg-white"
        disabled={isAddingTask}
      />
      <Button type="submit" variant="accent" size="lg" className="h-12 text-lg" disabled={isAddingTask}>
        {isAddingTask ? (
          <Loader className="h-6 w-6 animate-spin" />
        ) : (
          <PlusCircle className="h-6 w-6 mr-2" />
        )}
        Add Task
      </Button>
    </form>
  );
}
