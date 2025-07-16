'use client';

import TaskItem from './task-item';
import type { Task } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
  onSuggestDate: (id: string) => Promise<void>;
}

const cardColors = [
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-indigo-400',
  'bg-red-400',
  'bg-teal-400',
];

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onSuggestDate,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground text-xl">All done! Hooray! 🎉</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {tasks.map((task, index) => (
          <CarouselItem key={task.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <TaskItem
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
                onSuggestDate={onSuggestDate}
                color={cardColors[index % cardColors.length]}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
