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
    <header className="sticky top-0 z-20 border-b border-[var(--border-color)] bg-[var(--bg-card)]/95 shadow-sm backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

          {/* Brand */}
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--gold-color)]/40 bg-[var(--accent-soft)] shadow-sm sm:h-11 sm:w-11"
              aria-hidden="true"
            >
              <span className="text-xl sm:text-2xl">🌿</span>
              <span className="absolute bottom-0 left-0 h-1 w-full bg-[var(--gold-color)]" />
            </div>

            <div className="min-w-0">
              <h1 className="whitespace-nowrap font-serif text-base font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-lg lg:text-xl">
                <span className="text-[var(--accent-color)]">OG</span>{' '}
                Bar Guide
              </h1>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-px w-3 shrink-0 bg-[var(--gold-color)] sm:w-4" />

                <p className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] sm:text-[9px] lg:text-[10px] lg:tracking-[0.16em]">
                  Recipes & Flashcards
                </p>

                <span className="h-px w-3 shrink-0 bg-[var(--gold-color)] sm:w-4" />
              </div>
            </div>
          </div>

          {/* Navigation and Theme */}
          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-3 lg:gap-4">

            <nav
              aria-label="Main navigation"
              className="flex min-w-0 items-center gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1"
            >
              <button
                type="button"
                onClick={() => onViewChange('catalog')}
                aria-current={currentView === 'catalog' ? 'page' : undefined}
                className={`flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 lg:px-4 lg:text-sm ${
                  currentView === 'catalog'
                    ? 'bg-[var(--bg-card)] text-[var(--accent-color)] shadow-sm ring-1 ring-[var(--border-color)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span aria-hidden="true">☷</span>
                Catalog
              </button>

              <button
                type="button"
                onClick={() => onViewChange('quiz')}
                aria-current={currentView === 'quiz' ? 'page' : undefined}
                className={`flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 lg:px-4 lg:text-sm ${
                  currentView === 'quiz'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span aria-hidden="true">✦</span>
                Quiz Mode
              </button>
            </nav>

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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-base shadow-sm transition hover:border-[var(--gold-color)] hover:bg-[var(--accent-soft)] active:scale-95 sm:h-10 sm:w-10 sm:text-lg"
            >
              <span aria-hidden="true">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tuscan gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-color)]/50 to-transparent" />
    </header>
  );
}