import React from 'react';
import { type ViewMode } from '../types/recipe';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({
  currentView,
  onViewChange,
  isDarkMode,
  onToggleDarkMode,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[#F4F3EE]/95 dark:bg-[#151A14]/95 border-b border-[#E2DFD2] dark:border-[#2A3527] px-4 py-3.5 shadow-sm">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        
        {/* App Title */}
        <div className="flex items-center space-x-2.5">
          <span className="text-xl p-1.5 rounded-lg bg-[#3B5323]/10 dark:bg-[#5C7F35]/20 text-[#3B5323] dark:text-[#7A9A5B]">🌿</span>
          <div>
            <h1 className="font-bold text-base tracking-wide font-serif text-[#3B5323] dark:text-[#8CB066]">
              OG Bar Guide
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#8C7A5B] dark:text-[#D4AF37] font-semibold">
              Recipe & Flashcards
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Theme Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#E2DFD2] dark:bg-[#20291E] p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'catalog'
                  ? 'bg-white dark:bg-[#3B5323] text-[#2D3328] dark:text-white shadow-sm'
                  : 'text-[#555C50] dark:text-[#B1B8AE] hover:text-[#2D3328]'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => onViewChange('quiz')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'quiz'
                  ? 'bg-white dark:bg-[#3B5323] text-[#2D3328] dark:text-white shadow-sm'
                  : 'text-[#555C50] dark:text-[#B1B8AE] hover:text-[#2D3328]'
              }`}
            >
              Quiz Mode
            </button>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full border border-[#E2DFD2] dark:border-[#2A3527] bg-white dark:bg-[#20291E] text-xs shadow-sm hover:border-[#3B5323] transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

      </div>
    </header>
  );
}