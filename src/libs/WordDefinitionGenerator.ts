import { GENERATE_DEFINITIONS } from "./prompt-engineer/prompts";
import OpenAI from "openai";
const organizationId = "org-VbrBi1RINp1sv3x5lRSrzVCl";
const projectId = "proj_rwX8J6BHJWIkQxQy5ZhI51VT";

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: organizationId,
    project: projectId
});

export async function generateDefinitions(word: string, context?: string): Promise<any[]> {
    console.log(`Key: ${process.env.OPENAI_API_KEY}`);
    const definitions = [];
    // Call OpenAI API to get definitions
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: GENERATE_DEFINITIONS },
            { role: 'user', content: `(word: "${ word }")` }
        ]
    });
    // Parse response to get definitions
    const content = response.choices[0].message.content;
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    const definitionsJSON = content.substring(startIndex, endIndex + 1);
    const definitionsObject = JSON.parse(definitionsJSON);
    definitions.push(...definitionsObject.definitions);
    return definitions;
}
