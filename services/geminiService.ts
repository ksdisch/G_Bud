
import { GoogleGenAI, Type } from "@google/genai";
import type { RawEmail, ProcessedData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A concise, one-sentence summary of the email\'s main point.',
    },
    category: {
      type: Type.STRING,
      description: 'Categorize into one of: Work, Personal, Promotions, Newsletters, Urgent.',
    },
    priority: {
      type: Type.STRING,
      description: 'Assign priority based on urgency and content: High, Medium, or Low.',
    },
    event: {
      type: Type.OBJECT,
      description: 'Extract event details if any are mentioned. If no event, this should be null.',
      properties: {
        title: { type: Type.STRING, description: 'Title of the event.' },
        date: { type: Type.STRING, description: 'Date of the event in YYYY-MM-DD format.' },
        time: { type: Type.STRING, description: 'Time of the event in HH:MM format (24-hour clock).' },
        description: { type: Type.STRING, description: 'A brief description of the event.' },
      },
    },
    tasks: {
      type: Type.ARRAY,
      description: 'A list of actionable tasks or to-do items from the email. If none, return an empty array.',
      items: { type: Type.STRING },
    },
    suggestedActions: {
      type: Type.ARRAY,
      description: 'Suggest 2-3 relevant one-click actions based on the email content (e.g., "Confirm attendance", "Archive", "View Order"). If none, return an empty array.',
      items: { type: Type.STRING },
    },
  },
  required: ['summary', 'category', 'priority', 'tasks', 'suggestedActions']
};


export const processEmail = async (email: RawEmail): Promise<ProcessedData | null> => {
  const prompt = `
    Analyze the following email and provide a structured JSON response.

    From: ${email.sender}
    Subject: ${email.subject}
    Body:
    ${email.body}

    Your task is to act as an expert email assistant. Analyze the content, identify the key information, and format it according to the provided JSON schema.
    - Summarize the core message concisely.
    - Categorize the email accurately.
    - Determine its priority level.
    - Extract any specific event details (date, time, title).
    - List out any clear tasks for the recipient.
    - Suggest logical next actions.
    If a field like 'event' is not present in the email, do not include the key in the response.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });
    
    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    // Ensure arrays are present even if empty
    if (!data.tasks) data.tasks = [];
    if (!data.suggestedActions) data.suggestedActions = [];

    return data as ProcessedData;

  } catch (error) {
    console.error(`Error processing email ${email.id}:`, error);
    return null;
  }
};
