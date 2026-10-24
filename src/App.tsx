import { useState } from 'react';
import type { ViewMode } from './types/recipe';
import Navbar from './components/Navbar';
import CatalogView from './components/CatalogView';
import QuizView from './components/QuizView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-[#F4F3EE] dark:bg-[#151A14] text-[#2D3328] dark:text-[#E2E7DF] min-h-screen pb-12 font-sans">
        
        <Navbar
          currentView={currentView}
          onViewChange={setCurrentView}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {currentView === 'catalog' ? (
          <CatalogView />
        ) : (
          <QuizView />
        )}

      </div>
    </div>
  );
}