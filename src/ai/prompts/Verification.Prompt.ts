import { z } from 'zod';

export const inputSchema = z.object({
    username: z.string(),
    role: z.string(),
    action: z.string(),
});

export const outputSchema = z.object({
    decision: z.boolean(),
    thought: z.custom<`I believe this user ${"can" | "can NOT"} perform this action because ${string}`>(str => {
        return typeof str === "string" && /I believe this user (can|can NOT) perform this action because .*/.test(str);
    }),
});

const prompt = `You previous wrote a set of rules to your scratchpad in a lossless JSON format. Your new job is to look at the rules you created and validate if ther user can perform the action given their role. If you do not know if a user can access something return an error. The contents of your scratchpad are as follows: \n\n\`\`\`json\n ${JSON.stringify(require('@/ai/generated/Rules'))} \n\`\`\`. Can you validate if a the user names {{username}} with the role {{role}} can perform the action {{action}}?` as const;
export type Prompt = typeof prompt;
export type Output = z.infer<typeof outputSchema>;
export type Input = z.infer<typeof inputSchema>;
export type Errors = "unknown role" | "unknown action" | "unknown rule" | "unknown error";
