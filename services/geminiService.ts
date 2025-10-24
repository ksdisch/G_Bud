
import { GoogleGenAI, Type } from "@google/genai";
import type { RawEmail, ProcessedData, AppMode } from '../types';

// FIX: Initialize the GoogleGenAI client using `process.env.API_KEY` as per the coding guidelines.
// This resolves the TypeScript error regarding `import.meta.env` and ensures the correct API key handling method.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generalResponseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: 'A concise, one-sentence summary of the email\'s main point.' },
    category: { type: Type.STRING, description: 'Categorize into one of: Work, Personal, Promotions, Newsletters, Urgent.' },
    priority: { type: Type.STRING, description: 'Assign priority based on urgency and content: High, Medium, or Low.' },
    event: {
      type: Type.OBJECT,
      description: 'Extract event details if any are mentioned. If no event, this should be null.',
      nullable: true,
      properties: {
        title: { type: Type.STRING }, date: { type: Type.STRING }, time: { type: Type.STRING }, description: { type: Type.STRING },
      },
    },
    tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedActions: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ['summary', 'category', 'priority', 'tasks', 'suggestedActions']
};

const jobResponseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise, one-sentence summary of the email\'s main point from a job seeker\'s perspective.' },
        category: { type: Type.STRING, description: 'Categorize into: Job Alerts, Application Responses, Networking, Recruiter Outreach.' },
        applicationSubCategory: { type: Type.STRING, description: 'If category is "Application Responses", sub-categorize into: Interview Request, Rejection, Offer, Needs Action. Otherwise, this should be null.', nullable: true },
        priority: { type: Type.STRING, description: 'Assign priority (High, Medium, Low) based on relevance to the user\'s job search and urgency.' },
        isGoodFit: { type: Type.BOOLEAN, description: 'Based on the resume and job description, is this a good fit for the user?' },
        relevanceScore: { type: Type.INTEGER, description: 'A score from 0-100 indicating relevance of the job to the provided resume. Null if not a job description.' },
        interviewDetails: {
            type: Type.OBJECT,
            description: 'Extract interview details if any are mentioned. If no interview, this should be null.',
            nullable: true,
            properties: {
                title: { type: Type.STRING }, date: { type: Type.STRING }, time: { type: Type.STRING }, description: { type: Type.STRING }, platform: { type: Type.STRING }
            },
        },
        tasks: { type: Type.ARRAY, description: 'Actionable job search tasks (e.g., "Apply for Senior Frontend Engineer role", "Schedule interview with Acme Corp").', items: { type: Type.STRING } },
        tailoredResumePoints: { type: Type.ARRAY, description: 'List of 3-5 key bullet points to add or emphasize on the resume for this specific job. Empty if not a job alert.', items: { type: Type.STRING } },
        coverLetterDraft: { type: Type.STRING, description: 'A concise, professional draft for a cover letter, personalized with details from the job and resume. Null if not a job alert.' },
        companyResearch: { type: Type.STRING, description: 'A brief overview of the company mentioned, including what they do. Null if not applicable.' },
        suggestedActions: { type: Type.ARRAY, description: 'Job-related actions like "Draft Cover Letter", "Prepare for Interview", "Add to Calendar".', items: { type: Type.STRING } },
    },
    required: ['summary', 'category', 'priority', 'isGoodFit', 'tasks', 'suggestedActions']
};

const getPromptAndSchema = (email: RawEmail, mode: AppMode, resumeText?: string | null) => {
  const baseEmailText = `From: ${email.sender}\nSubject: ${email.subject}\nBody:\n${email.body}`;

  if (mode === 'jobSearch') {
    return {
      schema: jobResponseSchema,
      prompt: `You are an expert career assistant analyzing an email for a job seeker.
      
      MY RESUME:
      ---
      ${resumeText || 'No resume provided.'}
      ---

      INCOMING EMAIL:
      ---
      ${baseEmailText}
      ---
      
      Analyze the email based on my resume and provide a structured JSON response. Your task is to extract all relevant information for my job search.
      - Score the job's relevance and determine if it's a good fit.
      - Identify the email's category and sub-category within my job search.
      - Extract interview details, actionable tasks, and suggest next steps.
      - Help me prepare by drafting key resume bullet points and a cover letter for job alerts.
      - If a field is not applicable (e.g., 'interviewDetails' for a job alert), do not include the key in the response.
      `,
    };
  }

  // Default to general mode
  return {
    schema: generalResponseSchema,
    prompt: `Analyze the following email and provide a structured JSON response.
    
    EMAIL:
    ---
    ${baseEmailText}
    ---

    Your task is to act as an expert email assistant. Analyze the content, identify the key information, and format it according to the provided JSON schema.
    - Summarize the core message concisely.
    - Categorize the email accurately.
    - Determine its priority level.
    - Extract any specific event details.
    - List out any clear tasks.
    - Suggest logical next actions.
    - If a field like 'event' is not present in the email, do not include the key in the response.
    `,
  };
};

export const processEmail = async (email: RawEmail, mode: AppMode, resumeText?: string | null): Promise<ProcessedData | null> => {
  const { prompt, schema } = getPromptAndSchema(email, mode, resumeText);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    // Ensure arrays are present even if empty
    if (!data.tasks) data.tasks = [];
    if (!data.suggestedActions) data.suggestedActions = [];
    if (mode === 'jobSearch' && !data.tailoredResumePoints) data.tailoredResumePoints = [];

    return data as ProcessedData;

  } catch (error) {
    console.error(`Error processing email ${email.id} in ${mode} mode:`, error);
    return null;
  }
};
