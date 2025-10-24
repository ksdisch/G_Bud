
import type { RawEmail, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Work', 'Personal', 'Promotions', 'Newsletters', 'Urgent'];

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
    {
    id: '6',
    sender: 'HR Department <hr@corporate.com>',
    subject: 'Open Enrollment for 2024 Benefits is Now Live',
    body: `All employees,

    This is a reminder that the open enrollment period for your 2024 health benefits has begun. The deadline to make your selections is November 15th.

    Please log into the employee portal to review your options and make your elections. There will be a webinar on Tuesday at 10 AM to answer any questions.

    Thank you,
    Human Resources`,
    timestamp: '2023-10-25T09:00:00Z',
  },
];
