
import React, { useState, useEffect } from 'react';
import type { ProcessedEmail, AppMode } from '../types';
import { CalendarIcon, CheckCircleIcon, LightBulbIcon, TagIcon, ExclamationTriangleIcon, DocumentTextIcon, StarIcon, ClipboardDocumentIcon } from './Icons';

interface EmailDetailProps {
  email: ProcessedEmail | null;
  mode: AppMode;
}

const InfoPill: React.FC<{ text: string; className?: string; icon: React.ReactNode }> = ({ text, className = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {icon}
    {text}
  </span>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; colorClass: string;}> = ({title, icon, children, colorClass}) => (
    <div className={`p-4 bg-opacity-30 rounded-lg`}>
        <h3 className={`font-semibold ${colorClass} flex items-center gap-2 mb-2`}>{icon} {title}</h3>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
)

const GeneralContent: React.FC<{ email: ProcessedEmail }> = ({ email }) => {
    const { processed } = email;
    return (
        <div className="space-y-4">
            <Section title="AI Summary" icon={<LightBulbIcon className="w-5 h-5"/>} colorClass="text-indigo-800 dark:text-indigo-300">
                <p>{processed.summary}</p>
            </Section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {processed.event && (
                    <Section title="Event Detected" icon={<CalendarIcon className="w-5 h-5"/>} colorClass="text-green-800 dark:text-green-300">
                        <p><strong>Title:</strong> {processed.event.title}</p>
                        <p><strong>Date:</strong> {processed.event.date}</p>
                        <p><strong>Time:</strong> {processed.event.time}</p>
                        <button className="mt-2 w-full text-sm bg-green-600 text-white py-1.5 px-3 rounded-md hover:bg-green-700">Add to Calendar</button>
                    </Section>
                )}
                {processed.tasks.length > 0 && (
                     <Section title="Tasks Found" icon={<CheckCircleIcon className="w-5 h-5"/>} colorClass="text-blue-800 dark:text-blue-300">
                        <ul className="list-disc list-inside space-y-1">
                            {processed.tasks.map((task, index) => <li key={index}>{task}</li>)}
                        </ul>
                    </Section>
                )}
            </div>

            {processed.suggestedActions.length > 0 && (
                <Section title="Suggested Actions" icon={<LightBulbIcon className="w-5 h-5"/>} colorClass="text-yellow-800 dark:text-yellow-300">
                    <div className="flex flex-wrap gap-2">
                    {processed.suggestedActions.map((action, index) => (
                        <button key={index} className="text-sm bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 py-1 px-3 rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-700">{action}</button>
                    ))}
                    </div>
                </Section>
            )}
        </div>
    );
}

const JobSearchContent: React.FC<{ email: ProcessedEmail }> = ({ email }) => {
    const { processed } = email;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }
    
    return (
        <div className="space-y-4">
            <Section title="AI Summary" icon={<LightBulbIcon className="w-5 h-5"/>} colorClass="text-indigo-800 dark:text-indigo-300">
                <p>{processed.summary}</p>
            </Section>

            {(processed.tailoredResumePoints && processed.tailoredResumePoints.length > 0) && (
                <Section title="Resume Suggestions" icon={<StarIcon className="w-5 h-5"/>} colorClass="text-green-800 dark:text-green-300">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">The AI suggests emphasizing these points on your resume for this role:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {processed.tailoredResumePoints.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </Section>
            )}

            {processed.coverLetterDraft && (
                 <Section title="Cover Letter Draft" icon={<DocumentTextIcon className="w-5 h-5"/>} colorClass="text-blue-800 dark:text-blue-300">
                    <div className="relative">
                        <button onClick={() => copyToClipboard(processed.coverLetterDraft || '')} className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" title="Copy to clipboard">
                            <ClipboardDocumentIcon className="w-4 h-4"/>
                        </button>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-3 rounded-md">{processed.coverLetterDraft}</p>
                    </div>
                </Section>
            )}

            {processed.interviewDetails && (
                <Section title="Interview Details" icon={<CalendarIcon className="w-5 h-5"/>} colorClass="text-purple-800 dark:text-purple-300">
                    <p><strong>Title:</strong> {processed.interviewDetails.title}</p>
                    <p><strong>Date:</strong> {processed.interviewDetails.date}</p>
                    <p><strong>Time:</strong> {processed.interviewDetails.time}</p>
                    {processed.interviewDetails.platform && <p><strong>Platform:</strong> {processed.interviewDetails.platform}</p>}
                    <button className="mt-2 w-full text-sm bg-purple-600 text-white py-1.5 px-3 rounded-md hover:bg-purple-700">Add to Calendar</button>
                </Section>
            )}
        </div>
    )
}


const EmailDetail: React.FC<EmailDetailProps> = ({ email, mode }) => {
  const [activeTab, setActiveTab] = useState('ai-summary');

  useEffect(() => {
    setActiveTab('ai-summary');
  }, [email]);

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-500">Select an email to view its details</p>
      </div>
    );
  }

  const { processed } = email;

  const getPillClasses = (category: string) => {
    const mapping: { [key: string]: string } = {
        Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Personal: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Promotions: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        Newsletters: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Urgent: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        'Job Alerts': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'Application Responses': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Networking': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'Recruiter Outreach': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
    };
    return mapping[category];
  }

  const TABS = [
    { id: 'ai-summary', label: 'AI Insights' },
    { id: 'original', label: 'Original Message' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md h-full overflow-y-auto flex flex-col">
      <header className="p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{email.subject}</h1>
        <div className="flex items-center justify-between mt-2">
            <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{email.sender}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(email.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
                {processed.relevanceScore && (
                    <InfoPill text={`Relevance: ${processed.relevanceScore}%`} icon={<StarIcon className="w-3.5 h-3.5"/>} className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" />
                )}
                {processed.applicationSubCategory && (
                    <InfoPill text={processed.applicationSubCategory} icon={<TagIcon className="w-3.5 h-3.5"/>} />
                )}
                <InfoPill text={processed.category} className={getPillClasses(processed.category)} icon={<TagIcon className="w-3.5 h-3.5" />} />
            </div>
        </div>
      </header>

      <div className="border-b border-gray-200 dark:border-gray-700 px-6">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 flex-grow">
        {activeTab === 'ai-summary' && (
            mode === 'general' ? <GeneralContent email={email}/> : <JobSearchContent email={email}/>
        )}
        {activeTab === 'original' && (
             <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{email.body}</p>
        )}
      </div>
    </div>
  );
};

export default EmailDetail;
