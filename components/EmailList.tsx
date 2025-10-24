
import React from 'react';
import type { ProcessedEmail } from '../types';

interface EmailListProps {
  emails: ProcessedEmail[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

const PriorityIndicator: React.FC<{ priority: 'High' | 'Medium' | 'Low' }> = ({ priority }) => {
  const color = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  }[priority];
  return <span className={`w-2.5 h-2.5 rounded-full ${color} flex-shrink-0`} title={`Priority: ${priority}`}></span>;
};

const EmailListItem: React.FC<{ email: ProcessedEmail; isSelected: boolean; onSelect: () => void }> = ({ email, isSelected, onSelect }) => {
  return (
    <li
      onClick={onSelect}
      className={`p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${
        isSelected ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-grow overflow-hidden">
          <p className="text-sm font-semibold truncate text-gray-800 dark:text-gray-200">{email.sender.split('<')[0].trim()}</p>
          <p className="text-sm truncate font-medium text-gray-700 dark:text-gray-300">{email.subject}</p>
          <p className="text-xs truncate text-gray-500 dark:text-gray-400 mt-1">{email.processed.summary}</p>
        </div>
        <div className="flex items-center gap-2 pl-2">
            <PriorityIndicator priority={email.processed.priority} />
        </div>
      </div>
    </li>
  );
};

const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmailId, onSelectEmail }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Inbox</h2>
      </div>
      <ul className="overflow-y-auto flex-grow">
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={email.id === selectedEmailId}
            onSelect={() => onSelectEmail(email.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
