
import type { RawEmail, Category, JobCategory } from './types';

export const GENERAL_CATEGORIES: Category[] = ['All', 'Work', 'Personal', 'Promotions', 'Newsletters', 'Urgent'];
export const JOB_CATEGORIES: JobCategory[] = ['All', 'Job Alerts', 'Application Responses', 'Networking', 'Recruiter Outreach'];


export const MOCK_EMAILS: RawEmail[] = [
  {
    id: '1',
    sender: 'Alex Johnson <alex.j@example.com>',
    subject: 'Project Phoenix - Final Review & Next Steps',
    body: `Hi Team,

    Just a reminder that our final review for Project Phoenix is scheduled for this Friday at 2:00 PM. Please come prepared to discuss your sections. I've attached the latest report for your review.

    We need to finalize the Q3 roadmap based on the outcomes. Please send me your feedback on the draft proposal by end of day tomorrow.

    Let's make this a productive meeting.

    Thanks,
    Alex`,
    timestamp: '2023-10-27T10:00:00Z',
  },
  {
    id: '2',
    sender: 'Samantha Lee <samantha.lee@example.com>',
    subject: 'Re: Your recent order confirmation',
    body: `Hello,

    I'm writing to inquire about the status of my recent order (#A4B8C1). The tracking information hasn't been updated in three days. Could you please provide an update?

    The deadline to receive this for a gift is next Wednesday.

    Thank you,
    Samantha`,
    timestamp: '2023-10-27T09:30:00Z',
  },
  {
    id: '3',
    sender: 'Tech Weekly <newsletter@techweekly.com>',
    subject: 'This Week in AI: The latest breakthroughs and trends',
    body: `Welcome to your weekly dose of AI news!

    This week, we cover the rise of generative video models, ethical considerations in new AI regulations, and a deep dive into quantum computing's potential impact on machine learning.

    Read more on our website.
    [Link to articles]`,
    timestamp: '2023-10-26T18:00:00Z',
  },
  {
    id: '4',
    sender: 'Mom <susan.p@familymail.com>',
    subject: 'Dinner on Sunday?',
    body: `Hi sweetie,

    Hope you're having a good week! I was thinking of having a family dinner this Sunday around 6 PM. Your dad wants to try that new Italian place downtown.

    Let me know if you can make it so I can book a table.

    Love,
    Mom`,
    timestamp: '2023-10-26T15:22:00Z',
  },
  {
    id: '5',
    sender: 'Cloud Services Inc. <billing@cloudservices.com>',
    subject: 'Action Required: Your subscription payment failed',
    body: `Dear customer,

    We were unable to process the payment for your subscription. To avoid service interruption, please update your payment information within the next 48 hours.

    Visit your billing dashboard to update your details.

    Sincerely,
    The Cloud Services Team`,
    timestamp: '2023-10-27T11:00:00Z',
  },
];


export const MOCK_JOB_EMAILS: RawEmail[] = [
  {
    id: 'job-1',
    sender: 'LinkedIn <jobs-noreply@linkedin.com>',
    subject: 'New Job Alert: Senior Frontend Engineer at Innovate Inc.',
    body: `Hi there,

    A new job matching your profile has been posted:

    Job Title: Senior Frontend Engineer
    Company: Innovate Inc.
    Location: San Francisco, CA (Remote available)
    
    Description:
    Innovate Inc. is seeking a passionate Senior Frontend Engineer to build and scale our next-generation user interfaces. You will work with React, TypeScript, and GraphQL to create delightful user experiences.
    
    Requirements:
    - 5+ years of experience in frontend development.
    - Expertise in React and its ecosystem.
    - Strong understanding of UI/UX principles.
    - Experience with modern CI/CD pipelines.

    Apply now on LinkedIn.`,
    timestamp: '2023-10-28T08:00:00Z',
  },
  {
    id: 'job-2',
    sender: 'Sarah Chen, Recruiter <s.chen@techrecruit.io>',
    subject: 'Exciting Opportunity at DataDriven Corp',
    body: `Hello,

    I came across your profile and was very impressed with your background in data visualization and full-stack development. 
    
    My client, DataDriven Corp, is looking for a Lead Software Engineer to join their team. The role focuses on building interactive dashboards and would be a great fit for your skills.

    Would you be open to a brief chat next week to discuss this further?

    Best regards,
    Sarah Chen`,
    timestamp: '2023-10-27T14:00:00Z',
  },
  {
    id: 'job-3',
    sender: 'Acme Corp Careers <careers@acme.com>',
    subject: 'Interview Invitation for Software Engineer Role',
    body: `Dear Applicant,

    Thank you for your interest in the Software Engineer position at Acme Corp. We were impressed with your application and would like to invite you for an interview.
    
    The first round will be a 45-minute technical screen with our hiring manager, John Doe, via Google Meet.
    
    Please use the following link to book a time that works for you: [Calendar Link]
    
    We look forward to speaking with you.
    
    Sincerely,
    The Acme Corp Hiring Team`,
    timestamp: '2023-10-26T11:00:00Z',
  },
  {
    id: 'job-4',
    sender: 'Stark Industries <noreply@stark-careers.com>',
    subject: 'Update on your application for UI/UX Designer',
    body: `Hi,

    Thank you for applying for the UI/UX Designer role at Stark Industries. We received a large number of qualified applicants, and after careful consideration, we have decided to move forward with other candidates whose experience more closely matches the requirements of this position.
    
    We appreciate you taking the time to interview with us and encourage you to apply for other roles in the future.
    
    Best,
    Stark Industries`,
    timestamp: '2023-10-25T16:30:00Z',
  },
];
