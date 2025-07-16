export type Task = {
  id: string;
  text: string;
  emoji: string;
  completed: boolean;
  isSuggestingDate?: boolean;
  suggestedCompletionDate?: string;
  reasoning?: string;
  isLoading?: boolean;
};
