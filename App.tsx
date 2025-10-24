
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import { MOCK_EMAILS, MOCK_JOB_EMAILS, GENERAL_CATEGORIES, JOB_CATEGORIES } from './constants';
import { processEmail } from './services/geminiService';
import type { ProcessedEmail, Category, JobCategory, ProcessingStatus, AppMode } from './types';
import { LoadingSpinnerIcon, MailIcon, BriefcaseIcon, UserCircleIcon, DocumentTextIcon, ComputerDesktopIcon, ClipboardDocumentListIcon } from './components/Icons';

const JobSearchSetup: React.FC<{ onResumeLoaded: (resumeText: string) => void }> = ({ onResumeLoaded }) => {
  const [activeMethod, setActiveMethod] = useState<'drive' | 'upload' | 'paste'>('drive');
  const [pastedText, setPastedText] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MOCK_RESUME_CONTENT = `
John Doe
Senior Frontend Engineer
San Francisco, CA | (123) 456-7890 | john.doe@email.com | linkedin.com/in/johndoe | github.com/johndoe

Summary
Passionate Senior Frontend Engineer with over 8 years of experience in building and scaling modern, responsive web applications. Expert in React, TypeScript, and the latest frontend technologies. Proven ability to lead projects, mentor junior developers, and collaborate with cross-functional teams to deliver high-quality products.

Skills
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3/SASS
- Frameworks/Libraries: React, Redux, Next.js, GraphQL (Apollo), Webpack, Vite
- Testing: Jest, React Testing Library, Cypress
- Tools: Git, Docker, CI/CD (Jenkins, GitHub Actions), Figma, JIRA

Experience
Innovate Inc. | San Francisco, CA
Senior Frontend Engineer | June 2019 - Present
- Led the development of a new design system in React and TypeScript, reducing development time for new features by 30%.
- Architected and built the main dashboard application, handling real-time data visualization for over 100,000 daily active users.
- Mentored a team of 4 junior engineers, conducting code reviews and promoting best practices.

DataDriven Corp | Palo Alto, CA
Frontend Engineer | July 2016 - June 2019
- Developed interactive data visualization components using D3.js and React.
- Improved application performance by 40% through code splitting, lazy loading, and bundle optimization.
- Collaborated with UX/UI designers to translate wireframes into high-fidelity functional components.

Education
University of California, Berkeley
B.S. in Computer Science | 2012 - 2016
`;

  const MOCK_DRIVE_FILES = [
    { id: '1', name: 'Software Engineer Resume.pdf', content: MOCK_RESUME_CONTENT },
    { id: '2', name: 'My CV (Old Version).docx', content: 'This is an older, less relevant resume.' },
  ];
  
  const handleFileSelectFromDrive = (fileContent: string) => {
    onResumeLoaded(fileContent);
    setIsPickerOpen(false);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(`Simulating upload of file: ${event.target.files[0].name}`);
      onResumeLoaded(MOCK_RESUME_CONTENT);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      onResumeLoaded(pastedText);
    }
  };
  
  const MockFilePicker = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={() => setIsPickerOpen(false)}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Select Resume from Google Drive</h3>
          <button onClick={() => setIsPickerOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
        </div>
        <ul className="p-4 space-y-2">
          {MOCK_DRIVE_FILES.map(file => (
            <li key={file.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-6 h-6 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{file.name}</span>
              </div>
              <button 
                onClick={() => handleFileSelectFromDrive(file.content)} 
                className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );

  const TABS = [
    { id: 'drive', label: 'Google Drive', icon: <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.2 6H13.8L6 19.35V36.6H20.4L27.6 23.25H42L34.2 6Z" fill="#2196F3"></path><path d="M20.4 36.6L27.6 48L42 23.25H27.6L20.4 36.6Z" fill="#4CAF50"></path><path d="M11.55 36.6L6 27L13.8 6L18.9 14.7L11.55 36.6Z" fill="#FFC107"></path></svg> },
    { id: 'upload', label: 'Upload File', icon: <ComputerDesktopIcon className="w-5 h-5" /> },
    { id: 'paste', label: 'Paste Text', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> }
  ];

  return (
    <>
      {isPickerOpen && <MockFilePicker />}
      <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300">
          <div className="text-center mb-6">
            <BriefcaseIcon className="w-12 h-12 mb-3 mx-auto text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Power Up Your Job Search</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Provide your resume to let the AI score job relevance and tailor application materials for you.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1 mb-6 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/50">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMethod(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  activeMethod === tab.id
                    ? 'bg-white text-indigo-700 shadow-sm dark:bg-indigo-600 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[160px] flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            {activeMethod === 'drive' && (
              <div className="flex flex-col items-center animate-fade-in">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Connect to select your resume from Google Drive.</p>
                <button
                  onClick={() => setIsPickerOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                >
                  <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.2 6H13.8L6 19.35V36.6H20.4L27.6 23.25H42L34.2 6Z" fill="#2196F3"></path><path d="M20.4 36.6L27.6 48L42 23.25H27.6L20.4 36.6Z" fill="#4CAF50"></path><path d="M11.55 36.6L6 27L13.8 6L18.9 14.7L11.55 36.6Z" fill="#FFC107"></path></svg>
                  Connect Google Drive
                </button>
                <p className="text-xs text-gray-500 mt-3">(Simulated)</p>
              </div>
            )}
            {activeMethod === 'upload' && (
              <div className="flex flex-col items-center animate-fade-in">
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select a PDF or DOCX file from your computer.</p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt"/>
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                >
                  <ComputerDesktopIcon className="w-6 h-6" />
                  Upload from Computer
                </button>
              </div>
            )}
            {activeMethod === 'paste' && (
              <div className="w-full flex flex-col items-center animate-fade-in">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-24 p-2 border rounded-md mb-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
                <button
                  onClick={handlePasteSubmit}
                  disabled={!pastedText.trim()}
                  className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Resume
                </button>
              </div>
            )}
          </div>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
      </div>
    </>
  );
};


const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('general');
  const [resume, setResume] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [processedEmails, setProcessedEmails] = useState<ProcessedEmail[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | JobCategory>('All');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  
  const processAllEmails = useCallback(async () => {
    if (mode === 'jobSearch' && !resume) {
        setProcessedEmails([]);
        setSelectedEmailId(null);
        setProcessingStatus('idle'); // waiting for resume
        return;
    }

    setProcessingStatus('processing');
    const emailsToProcess = mode === 'general' ? MOCK_EMAILS : MOCK_JOB_EMAILS;
    
    const promises = emailsToProcess.map(async (email) => {
      const processedData = await processEmail(email, mode, resume);
      if (processedData) {
        return { ...email, processed: processedData };
      }
      return null;
    });

    const results = await Promise.all(promises);
    const successfulEmails = results.filter((e): e is ProcessedEmail => e !== null);
    
    setProcessedEmails(successfulEmails);
    setProcessingStatus(successfulEmails.length > 0 ? 'done' : 'error');
    if (successfulEmails.length > 0) {
      setSelectedEmailId(successfulEmails[0].id);
    } else {
      setSelectedEmailId(null);
    }
  }, [mode, resume]);

  useEffect(() => {
    setSelectedCategory('All');
    processAllEmails();
  }, [mode, resume, processAllEmails]);

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
  
  const handleSelectCategory = (category: Category | JobCategory) => {
    setSelectedCategory(category);
    const firstEmailInCategory = (category === 'All' ? processedEmails : processedEmails.filter(e => e.processed.category === category))[0];
    if(firstEmailInCategory) {
        setSelectedEmailId(firstEmailInCategory.id);
    } else {
        setSelectedEmailId(null);
    }
  }

  const renderContent = () => {
    if (mode === 'jobSearch' && !resume) {
        return <JobSearchSetup onResumeLoaded={setResume} />;
    }

    if (processingStatus === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <LoadingSpinnerIcon className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold">Analyzing your inbox...</h2>
          <p>The AI assistant is summarizing and categorizing your emails.</p>
        </div>
      );
    }
    
    if (processingStatus === 'error' && processedEmails.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
                <MailIcon className="w-16 h-16 mb-4 text-red-500"/>
                <h2 className="text-xl font-semibold">Could not process emails</h2>
                <p className="max-w-md">There was an error communicating with the AI assistant. This can happen due to API key issues or network problems.</p>
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
          <EmailDetail email={selectedEmail} mode={mode} />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            {mode === 'general' ? <UserCircleIcon className="w-8 h-8"/> : <BriefcaseIcon className="w-8 h-8"/>}
            AI Email Assistant
        </h1>
        <div className="flex items-center gap-2 p-1 rounded-full bg-gray-200 dark:bg-gray-800">
            <button onClick={() => setMode('general')} className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${mode === 'general' ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>General</button>
            <button onClick={() => setMode('jobSearch')} className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${mode === 'jobSearch' ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>Job Search</button>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          mode={mode}
          categories={mode === 'general' ? GENERAL_CATEGORIES : JOB_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <main className="flex-grow bg-gray-50 dark:bg-gray-800/50 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
