// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides AI suggestions to estimate a completion date for a task.
 *
 * - suggestCompletionDate - A function that suggests a completion date for a given task.
 * - SuggestCompletionDateInput - The input type for the suggestCompletionDate function.
 * - SuggestCompletionDateOutput - The return type for the suggestCompletionDate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCompletionDateInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  currentDay: z.string().describe('The current day of the week.'),
  remainingTasks: z.number().describe('The number of remaining tasks for the day.'),
  otherContext: z.string().optional().describe('Any other relevant context.'),
});
export type SuggestCompletionDateInput = z.infer<typeof SuggestCompletionDateInputSchema>;

const SuggestCompletionDateOutputSchema = z.object({
  suggestedCompletionDate: z.string().describe('The suggested completion date for the task.'),
  reasoning: z.string().describe('The reasoning behind the suggested completion date.'),
});
export type SuggestCompletionDateOutput = z.infer<typeof SuggestCompletionDateOutputSchema>;

export async function suggestCompletionDate(input: SuggestCompletionDateInput): Promise<SuggestCompletionDateOutput> {
  return suggestCompletionDateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCompletionDatePrompt',
  input: {schema: SuggestCompletionDateInputSchema},
  output: {schema: SuggestCompletionDateOutputSchema},
  prompt: `You are a helpful assistant that suggests a completion date for a given task.

  Based on the task description, current day, number of remaining tasks, and any other context, suggest a realistic completion date.
  Explain your reasoning for the suggested date.

  Task Description: {{{taskDescription}}}
  Current Day: {{{currentDay}}}
  Remaining Tasks: {{{remainingTasks}}}
  Other Context: {{{otherContext}}}

  Please provide the suggested completion date and reasoning.`,
});

const suggestCompletionDateFlow = ai.defineFlow(
  {
    name: 'suggestCompletionDateFlow',
    inputSchema: SuggestCompletionDateInputSchema,
    outputSchema: SuggestCompletionDateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
