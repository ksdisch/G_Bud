
import React from 'react';
import type { Category } from '../types';
import { InboxIcon, TagIcon, PaperAirplaneIcon, NewspaperIcon, ExclamationTriangleIcon } from './Icons';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categoryIcons: { [key in Category]?: React.ReactNode } = {
  'All': <InboxIcon className="w-5 h-5" />,
  'Work': <TagIcon className="w-5 h-5 text-blue-500" />,
  'Personal': <TagIcon className="w-5 h-5 text-green-500" />,
  'Promotions': <PaperAirplaneIcon className="w-5 h-5 text-purple-500" />,
  'Newsletters': <NewspaperIcon className="w-5 h-5 text-yellow-500" />,
  'Urgent': <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />,
};

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex-shrink-0">
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full flex items-center gap-3 px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {categoryIcons[category] || <TagIcon className="w-5 h-5" />}
                <span>{category}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
