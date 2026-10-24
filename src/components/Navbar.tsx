
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
    <header
      className="
        sticky top-0 z-20
        border-b border-[var(--border-color)]
        bg-[var(--bg-card)]/95
        backdrop-blur-xl
        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        transition-colors duration-200
      "
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">

        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              relative flex h-11 w-11 shrink-0 items-center justify-center
              overflow-hidden rounded-xl
              border border-[var(--gold-color)]/40
              bg-[var(--accent-soft)]
              shadow-sm
            "
            aria-hidden="true"
          >
            <span className="text-2xl leading-none">🌿</span>
            <span className="absolute bottom-0 left-0 h-1 w-full bg-[var(--gold-color)]" />
          </div>

          <div className="min-w-0">
            <h1
              className="
                truncate font-serif text-lg font-bold leading-tight
                tracking-tight text-[var(--text-primary)]
                sm:text-xl
              "
            >
              <span className="text-[var(--accent-color)]">OG</span>
              {' '}Bar Guide
            </h1>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-px w-4 bg-[var(--gold-color)]" />
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px]">
                Recipes & Flashcards
              </p>
              <span className="h-px w-4 bg-[var(--gold-color)]" />
            </div>
          </div>
        </div>

        {/* Navigation and Theme */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav
            aria-label="Main navigation"
            className="
              flex items-center gap-1 rounded-xl
              border border-[var(--border-color)]
              bg-[var(--bg-secondary)] p-1
            "
          >
            <button
              type="button"
              onClick={() => onViewChange('catalog')}
              aria-current={currentView === 'catalog' ? 'page' : undefined}
              className={`
                flex min-h-9 items-center justify-center gap-1.5
                rounded-lg px-2.5 py-2 text-xs font-semibold
                transition-all duration-200 sm:px-4 sm:text-sm
                ${
                  currentView === 'catalog'
                    ? 'bg-[var(--bg-card)] text-[var(--accent-color)] shadow-sm ring-1 ring-[var(--border-color)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <span aria-hidden="true">☷</span>
              <span>Catalog</span>
            </button>

            <button
              type="button"
              onClick={() => onViewChange('quiz')}
              aria-current={currentView === 'quiz' ? 'page' : undefined}
              className={`
                flex min-h-9 items-center justify-center gap-1.5
                rounded-lg px-2.5 py-2 text-xs font-semibold
                transition-all duration-200 sm:px-4 sm:text-sm
                ${
                  currentView === 'quiz'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <span aria-hidden="true">✦</span>
              <span>Quiz</span>
            </button>
          </nav>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-[var(--border-color)]
              bg-[var(--bg-card)] text-lg
              shadow-sm transition-all duration-200
              hover:border-[var(--gold-color)]
              hover:bg-[var(--accent-soft)]
              active:scale-95
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[var(--focus-ring)]
            "
          >
            <span aria-hidden="true">
              {isDarkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </div>

      {/* Fine Tuscan gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-color)]/50 to-transparent" />
    </header>
  );
}
