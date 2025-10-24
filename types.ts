
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

export interface ProcessedData {
  summary: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  event?: EventDetails;
  tasks: string[];
  suggestedActions: string[];
}

export interface ProcessedEmail extends RawEmail {
  processed: ProcessedData;
}

export type Category = 'All' | 'Work' | 'Personal' | 'Promotions' | 'Newsletters' | 'Urgent';

export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';
