import { useState, useEffect } from 'react';
import type { ViewMode } from './types/recipe';
import Navbar from './components/Navbar';
import CatalogView from './components/CatalogView';
import QuizView from './components/QuizView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      data-theme={isDarkMode ? 'dark' : 'light'}
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="min-h-screen pb-12">
        {currentView === 'catalog' ? <CatalogView /> : <QuizView />}
      </main>
    </div>
  );
}