import { z } from 'zod';

export const inputSchema = z.object({
    username: z.string(),
    role: z.string(),
    action: z.string(),
    scratchpad: z.string(),
});

export const outputSchema = z.object({
    decision: z.boolean(),
    thought: z.string(),
});

export type Prompt = "You previous wrote a set of rules to your scratchpad in a lossless JSON format. Your new job is to look at the rules you created and validate if ther user can perform the action given their role. If you do not know if a user can access something return an error. The contents of your scratchpad are as follows: \n\n```json\n {{scratchpad}} \n```. Can you validate if a the user names {{username}} with the role {{role}} can perform the action {{action}}?";
export type Output = z.infer<typeof outputSchema>;
export type Input = z.infer<typeof inputSchema>;
export type Errors = "unknown role" | "unknown action" | "unknown rule" | "unknown error";
