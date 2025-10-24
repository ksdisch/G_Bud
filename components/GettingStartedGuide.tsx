import React, { useState } from 'react';
import { GoogleIcon, CheckBadgeIcon, BriefcaseIcon, UserCircleIcon, LockClosedIcon } from './Icons';

interface GettingStartedGuideProps {
  onClose: () => void;
  isGoogleConnected: boolean;
  setIsGoogleConnected: (isConnected: boolean) => void;
}

const GettingStartedGuide: React.FC<GettingStartedGuideProps> = ({ onClose, isGoogleConnected, setIsGoogleConnected }) => {
    const [step, setStep] = useState<'initial' | 'permissions' | 'connected'>(isGoogleConnected ? 'connected' : 'initial');

    const handleConnect = () => {
        setStep('permissions');
    };

    const handleAllow = () => {
        setIsGoogleConnected(true);
        setStep('connected');
    };

    const handleDeny = () => {
        setStep('initial');
    }

    const renderConnectionStep = () => {
        switch (step) {
            case 'initial':
                return (
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Step 1: Connect Your Account</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Link your Google Account to enable full functionality, including email processing, calendar integration, and document analysis.
                        </p>
                        <button
                            onClick={handleConnect}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                        >
                            <GoogleIcon className="w-6 h-6" />
                            Connect Google Account
                        </button>
                         <p className="text-xs text-gray-500 mt-3">(Simulated)</p>
                    </div>
                );
            case 'permissions':
                return (
                     <div className="text-left p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <GoogleIcon className="w-8 h-8"/>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">AI Email Assistant wants to access your Google Account</h3>
                                <p className="text-sm text-gray-500">This is a simulated request</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This will allow AI Email Assistant to:</p>
                        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-6">
                            <li className="flex items-start gap-3"><CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span><strong>View and manage your email</strong> (Read from Gmail to process)</span></li>
                            <li className="flex items-start gap-3"><CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span><strong>See, edit, and create your Google Calendar events</strong> (To add tasks and interviews)</span></li>
                            <li className="flex items-start gap-3"><CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span><strong>View your Google Drive files</strong> (To use your resume from Docs/Drive)</span></li>
                        </ul>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4 flex items-center gap-2"><LockClosedIcon className="w-4 h-4"/> Your data is processed securely and is not stored.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={handleDeny} className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Deny</button>
                            <button onClick={handleAllow} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Allow</button>
                        </div>
                    </div>
                )
            case 'connected':
                return (
                     <div className="text-center p-6 bg-green-50 dark:bg-green-900/40 rounded-lg flex items-center justify-center gap-3">
                        <CheckBadgeIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
                        <div>
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Google Account Connected!</h3>
                            <p className="text-sm text-green-700 dark:text-green-400">You can now use all features.</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 flex items-center justify-between border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Getting Started Guide</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none">&times;</button>
                </div>
                
                <div className="p-6 space-y-6">
                    {renderConnectionStep()}
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Step 2: Understand the Modes</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <UserCircleIcon className="w-8 h-8 mb-2 text-indigo-500" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300">General Mode</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">For everyday email management. It summarizes, extracts tasks and events, and helps you prioritize your personal and work inbox.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <BriefcaseIcon className="w-8 h-8 mb-2 text-indigo-500" />
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Job Search Mode</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">A powerful assistant for your job hunt. It scores job alerts against your resume, drafts cover letters, and tracks applications.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">How It Works</h3>
                        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                           <li className="flex items-start gap-3"><strong className="font-semibold text-indigo-500 dark:text-indigo-400 w-20">Select:</strong><span>Click an email from the list on the left.</span></li>
                           <li className="flex items-start gap-3"><strong className="font-semibold text-indigo-500 dark:text-indigo-400 w-20">Review:</strong><span>The right panel shows AI-generated insights like summaries, tasks, and job relevance scores.</span></li>
                           <li className="flex items-start gap-3"><strong className="font-semibold text-indigo-500 dark:text-indigo-400 w-20">Act:</strong><span>Use the suggested actions, add events to your calendar, or copy tailored application materials.</span></li>
                        </ul>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 text-right rounded-b-xl border-t dark:border-gray-700">
                    <button onClick={onClose} className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                        Got it!
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default GettingStartedGuide;
