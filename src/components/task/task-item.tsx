'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit, Loader, Save, Sparkles, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
  onSuggestDate: (id: string) => Promise<void>;
  color: string;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onSuggestDate,
  color,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleUpdate = () => {
    if (editedText.trim()) {
      onUpdateTask(task.id, editedText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  return (
    <li className="list-none">
      <Card className={cn("flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden", color, task.completed && "bg-muted/60")}>
        <CardHeader className="p-4 relative flex-row items-center justify-center">
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="h-8 w-8 rounded-full data-[state=checked]:bg-green-500 data-[state=checked]:text-white border-4 border-white/50 bg-black/20"
            />
          </div>
          {task.isLoading ? (
             <Skeleton className="w-24 h-24 rounded-full" />
          ) : (
            <div
              onClick={() => onToggleComplete(task.id)}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center text-6xl transition-all duration-300 cursor-pointer",
                task.completed ? 'opacity-50 scale-90' : 'opacity-100 scale-100'
              )}
            >
              {task.emoji}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0 flex flex-col text-center">
          <div className="flex-grow">
            {isEditing ? (
              <Input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                className="h-10 text-lg bg-white/80 focus:bg-white text-gray-800"
                autoFocus
              />
            ) : (
              <div className="flex flex-col items-center">
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "text-lg font-medium cursor-pointer transition-all text-gray-800",
                    task.completed && "line-through text-gray-800/50"
                  )}
                >
                  {task.text}
                </label>
                {task.suggestedCompletionDate && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="w-fit mt-1 bg-white/20 border-white/50 text-white cursor-default">
                          {task.suggestedCompletionDate}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{task.reasoning}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-2 pt-0">
          <div className="flex items-center gap-1 w-full justify-center">
            {isEditing ? (
              <>
                <Button size="icon" variant="ghost" onClick={handleUpdate} className="h-10 w-10 text-white hover:bg-white/20">
                  <Save className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-10 w-10 text-white hover:bg-white/20">
                  <X className="h-6 w-6" />
                </Button>
              </>
            ) : (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onSuggestDate(task.id)}
                          disabled={task.isSuggestingDate || task.isLoading}
                          className="h-10 w-10 text-white hover:bg-white/20"
                        >
                          {task.isSuggestingDate ? (
                            <Loader className="h-6 w-6 animate-spin" />
                          ) : (
                            <Sparkles className="h-6 w-6" />
                          )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Suggest Date</TooltipContent>
                  </Tooltip>
                   <Tooltip>
                    <TooltipTrigger asChild>
                       <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsEditing(true)}
                          disabled={task.isLoading}
                          className="h-10 w-10 text-white hover:bg-white/20"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                   <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDeleteTask(task.id)}
                          disabled={task.isLoading}
                          className="h-10 w-10 text-white hover:bg-white/20"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
