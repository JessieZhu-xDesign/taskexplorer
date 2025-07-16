'use server';
/**
 * @fileOverview Suggests an emoji for a given task description.
 *
 * - suggestEmoji - A function that suggests an emoji for a task.
 * - SuggestEmojiInput - The input type for the suggestEmoji function.
 * - SuggestEmojiOutput - The return type for the suggestEmoji function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEmojiInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
});
export type SuggestEmojiInput = z.infer<typeof SuggestEmojiInputSchema>;

const SuggestEmojiOutputSchema = z.object({
  emoji: z.string().describe('A single emoji that represents the task.'),
});
export type SuggestEmojiOutput = z.infer<typeof SuggestEmojiOutputSchema>;

export async function suggestEmoji(
  input: SuggestEmojiInput
): Promise<SuggestEmojiOutput> {
  return suggestEmojiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEmojiPrompt',
  input: {schema: SuggestEmojiInputSchema},
  output: {schema: SuggestEmojiOutputSchema},
  prompt: `You are an expert at selecting the perfect emoji for a given text.
You must choose a single, relevant emoji to represent the following task for a child's to-do list.
Do not provide any other text, just the emoji.

Task: {{{taskDescription}}}
`,
});

const suggestEmojiFlow = ai.defineFlow(
  {
    name: 'suggestEmojiFlow',
    inputSchema: SuggestEmojiInputSchema,
    outputSchema: SuggestEmojiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
