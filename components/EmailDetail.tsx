
import React from 'react';
import type { ProcessedEmail } from '../types';
import { CalendarIcon, CheckCircleIcon, LightBulbIcon, TagIcon, ExclamationTriangleIcon } from './Icons';

interface EmailDetailProps {
  email: ProcessedEmail | null;
}

const priorityPillClasses = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const categoryPillClasses: { [key: string]: string } = {
  Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Promotions: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  Newsletters: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const InfoPill: React.FC<{ text: string; className: string; icon: React.ReactNode }> = ({ text, className, icon }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {icon}
    {text}
  </span>
);

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <p className="text-gray-500">Select an email to view its details</p>
      </div>
    );
  }

  const { processed } = email;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md h-full overflow-y-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{email.subject}</h1>
        <div className="flex items-center justify-between mt-2">
            <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{email.sender}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(email.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
                <InfoPill text={processed.priority} className={priorityPillClasses[processed.priority]} icon={<ExclamationTriangleIcon className="w-3.5 h-3.5" />} />
                <InfoPill text={processed.category} className={categoryPillClasses[processed.category] || 'bg-gray-100 text-gray-800'} icon={<TagIcon className="w-3.5 h-3.5" />} />
            </div>
        </div>
      </header>

      <section className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-2">AI Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">{processed.summary}</p>
      </section>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {processed.event && (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2"><CalendarIcon className="w-5 h-5" /> Event Detected</h3>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Title:</strong> {processed.event.title}</p>
              <p><strong>Date:</strong> {processed.event.date}</p>
              <p><strong>Time:</strong> {processed.event.time}</p>
            </div>
            <button className="mt-3 w-full text-sm bg-green-600 text-white py-1.5 px-3 rounded-md hover:bg-green-700 transition-colors">Add to Calendar</button>
          </div>
        )}
        {processed.tasks.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2"><CheckCircleIcon className="w-5 h-5" /> Tasks Found</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {processed.tasks.map((task, index) => <li key={index}>{task}</li>)}
            </ul>
          </div>
        )}
      </div>

      {processed.suggestedActions.length > 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 flex items-center gap-2"><LightBulbIcon className="w-5 h-5" /> Suggested Actions</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {processed.suggestedActions.map((action, index) => (
                <button key={index} className="text-sm bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 py-1 px-3 rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors">{action}</button>
              ))}
            </div>
          </div>
        )}


      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Original Message</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{email.body}</p>
      </div>
    </div>
  );
};

export default EmailDetail;
