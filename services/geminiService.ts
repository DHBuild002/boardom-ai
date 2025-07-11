import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Task } from '../types';

/**
 * Checks if the Gemini API key is available in the environment.
 * @returns {boolean} True if the API key is set, false otherwise.
 */
export const isApiConfigured = (): boolean => {
  const apiKey = process.env.API_KEY;
  return !!apiKey && apiKey.length > 0;
};


if (!isApiConfigured()) {
  console.error("API_KEY environment variable not set. The application will not be able to connect to AI services.");
}

// Initialize AI with a function to avoid early execution error if env is not set.
const getAi = () => {
    if (!isApiConfigured()) {
        return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY! });
}

const taskSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, concise title for the task (3-5 words)."
    },
    description: {
      type: Type.STRING,
      description: "A one-sentence description of what the task involves."
    },
  },
  required: ["title", "description"]
};

const configurationErrorTask = {
    title: "Configuration Error",
    description: "The application is not configured to connect to the AI service. Please contact an administrator."
};

export const generateTasks = async (prompt: string, type: 'single' | 'full'): Promise<Omit<Task, 'id'>[]> => {
  const ai = getAi();
  if (!ai) {
    return [configurationErrorTask];
  }

  const systemInstruction = "You are an expert project manager. Your role is to break down software development goals into actionable tasks for a Kanban board. Respond only with the requested JSON object.";

  const userPrompt = type === 'full'
    ? `Based on the project idea "${prompt}", generate a list of 5-7 high-level tasks. For each task, provide a title and a description.`
    : `Based on the feature request "${prompt}", generate a single task. Provide a title and a description.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: type === 'full' 
                ? { type: Type.ARRAY, items: taskSchema } 
                : taskSchema,
        }
    });

    const jsonText = response.text.trim();
    const generatedContent = JSON.parse(jsonText);

    if (type === 'full') {
      return generatedContent as Omit<Task, 'id'>[];
    } else {
      return [generatedContent] as Omit<Task, 'id'>[];
    }
  } catch (error) {
    console.error("Error generating tasks:", error);
    // Return a user-friendly error task
    return [{
      title: "AI Generation Failed",
      description: "There was an error contacting the AI service. This might be due to an invalid API key or network issues."
    }];
  }
};

export const generateActionablePrompt = async (task: Task): Promise<string> => {
  const ai = getAi();
  if (!ai) {
      return "Configuration Error: The application is not configured to connect to the AI service.";
  }
  
  const systemInstruction = "You are a senior full-stack developer AI assistant. Your goal is to provide a clear, actionable prompt that a developer can use in their IDE or another LLM to complete a specific task. The output should be plain text or markdown, ready to be copied.";
  const userPrompt = `I am working on the following task:
  
  **Title:** ${task.title}
  **Description:** ${task.description}

  Please generate a detailed, actionable prompt for me to start working on this. Include key considerations, suggested steps, and a starting code snippet or file structure if applicable. Frame your response as guidance for a developer.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating actionable prompt:", error);
    return "Error: Could not generate a prompt. Please try again later.";
  }
};