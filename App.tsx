
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import { MOCK_EMAILS, CATEGORIES } from './constants';
import { processEmail } from './services/geminiService';
import type { ProcessedEmail, Category, ProcessingStatus } from './types';
import { LoadingSpinnerIcon, MailIcon } from './components/Icons';

const App: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [processedEmails, setProcessedEmails] = useState<ProcessedEmail[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const processAllEmails = useCallback(async () => {
    setProcessingStatus('processing');
    const promises = MOCK_EMAILS.map(async (email) => {
      const processedData = await processEmail(email);
      if (processedData) {
        return { ...email, processed: processedData };
      }
      return null;
    });

    const results = await Promise.all(promises);
    const successfulEmails = results.filter((e): e is ProcessedEmail => e !== null);
    
    setProcessedEmails(successfulEmails);
    setProcessingStatus('done');
    if (successfulEmails.length > 0) {
      setSelectedEmailId(successfulEmails[0].id);
    }
  }, []);

  useEffect(() => {
    processAllEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredEmails = useMemo(() => {
    if (selectedCategory === 'All') {
      return processedEmails;
    }
    return processedEmails.filter(email => email.processed.category === selectedCategory);
  }, [processedEmails, selectedCategory]);

  const selectedEmail = useMemo(() => {
    if (!selectedEmailId) return null;
    return processedEmails.find(email => email.id === selectedEmailId) || null;
  }, [selectedEmailId, processedEmails]);

  const renderContent = () => {
    if (processingStatus === 'processing' || processingStatus === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <LoadingSpinnerIcon className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold">Analyzing your inbox...</h2>
          <p>The AI assistant is summarizing and categorizing your emails.</p>
        </div>
      );
    }
    
    if (processingStatus === 'error' || processedEmails.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <MailIcon className="w-16 h-16 mb-4 text-red-500"/>
                <h2 className="text-xl font-semibold">Could not process emails</h2>
                <p>There was an error communicating with the AI assistant.</p>
                <button 
                  onClick={processAllEmails} 
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retry
                </button>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-4 p-4">
        <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3">
          <EmailList
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onSelectEmail={setSelectedEmailId}
          />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-9">
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    );
  };


  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AI Email Assistant</h1>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <main className="flex-grow bg-gray-50 dark:bg-gray-800/50 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
