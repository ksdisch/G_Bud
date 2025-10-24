
export type AppMode = 'general' | 'jobSearch';

export type Category = 'All' | 'Work' | 'Personal' | 'Promotions' | 'Newsletters' | 'Urgent';
export type JobCategory = 'All' | 'Job Alerts' | 'Application Responses' | 'Networking' | 'Recruiter Outreach';

export interface RawEmail {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface InterviewDetails extends EventDetails {
  platform?: string;
}

export interface ProcessedData {
  // Common fields
  summary: string;
  category: Category | JobCategory;
  priority: 'High' | 'Medium' | 'Low';
  tasks: string[];
  suggestedActions: string[];
  
  // General fields
  event?: EventDetails;

  // Job Search specific fields
  applicationSubCategory?: 'Interview Request' | 'Rejection' | 'Offer' | 'Needs Action';
  relevanceScore?: number; // 0-100
  isGoodFit?: boolean;
  tailoredResumePoints?: string[];
  coverLetterDraft?: string;
  interviewDetails?: InterviewDetails;
  companyResearch?: string;
}

export interface ProcessedEmail extends RawEmail {
  processed: ProcessedData;
}

export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';
