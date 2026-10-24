import { useState, useMemo } from 'react';
import recipesData from '../data/recipes.json';
import type { Recipe } from '../types/recipe';

export default function RecipeCatalogPreview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const recipes = recipesData as Recipe[];

  const categories = useMemo(() => {
    const cats = recipes.map((r) => r.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'All' || recipe.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesName = recipe.name.toLowerCase().includes(query);
      const matchesTags = recipe.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesIngredients = recipe.ingredients.some((ing) =>
        ing.item.toLowerCase().includes(query)
      );

      return matchesCategory && (matchesName || matchesTags || matchesIngredients);
    });
  }, [recipes, searchQuery, selectedCategory]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Olive Garden Tuscan Kitchen Theme Wrapper */}
      <div className="bg-[#F4F3EE] dark:bg-[#151A14] text-[#2D3328] dark:text-[#E2E7DF] min-h-screen pb-12 font-sans">
        
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-20 backdrop-blur-md bg-[#F4F3EE]/95 dark:bg-[#151A14]/95 border-b border-[#E2DFD2] dark:border-[#2A3527] px-4 py-3.5 shadow-sm">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl p-1.5 rounded-lg bg-[#3B5323]/10 dark:bg-[#5C7F35]/20 text-[#3B5323] dark:text-[#7A9A5B]">🌿</span>
              <div>
                <h1 className="font-bold text-base tracking-wide font-serif text-[#3B5323] dark:text-[#8CB066]">
                  Olive Garden
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-[#8C7A5B] dark:text-[#D4AF37] font-semibold">
                  Bartender Bar Guide
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-[#E2DFD2] dark:border-[#2A3527] bg-white dark:bg-[#20291E] text-xs shadow-sm hover:border-[#3B5323] transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#8C7A5B]">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search drinks, spirits, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2DFD2] dark:border-[#2A3527] bg-white dark:bg-[#20291E] text-[#2D3328] dark:text-[#E2E7DF] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5323] dark:focus:ring-[#7A9A5B] text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Horizontal Filter Pills (Olive & Gold Theme) */}
          <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-[#3B5323] text-white dark:bg-[#5C7F35] dark:text-white shadow'
                    : 'bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] text-[#555C50] dark:text-[#B1B8AE] hover:border-[#3B5323]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#8C7A5B] dark:text-[#A39B8B] px-1 font-medium">
            Showing {filteredRecipes.length} of {recipes.length} drink recipes
          </div>

          {/* Drink Cards */}
          <div className="space-y-3">
            {filteredRecipes.map((recipe) => {
              const isExpanded = expandedId === recipe.id;

              return (
                <div
                  key={recipe.id}
                  className="bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:border-[#3B5323]/50"
                >
                  {/* Card Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : recipe.id)}
                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#3B5323]/[0.02] dark:hover:bg-white/[0.02] transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2.5">
                        <h2 className="font-bold text-base font-serif text-[#2D3328] dark:text-[#F0F2EE]">
                          {recipe.name}
                        </h2>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F3EE] dark:bg-[#161D15] text-[#555C50] dark:text-[#9DA698] font-semibold border border-[#E2DFD2] dark:border-[#2A3527]">
                          {recipe.glass}
                        </span>
                      </div>
                      <p className="text-xs text-[#737A6E] dark:text-[#9DA698] line-clamp-1 font-normal">
                        {recipe.ingredients.map((i) => `${i.amount} ${i.item}`).join(' • ')}
                      </p>
                    </div>

                    <div className="text-[#8C7A5B] font-bold text-xs ml-2 p-1.5 rounded-full bg-[#F4F3EE] dark:bg-[#161D15]">
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-[#E2DFD2] dark:border-[#2A3527] space-y-4 text-sm bg-[#FAF9F5] dark:bg-[#1B2319]">
                      
                      {/* Special Bar Note / Warning Callout */}
                      {recipe.specialNotes && (
                        <div className="p-3 rounded-lg bg-[#FDF8E2] dark:bg-[#2C291B] border border-[#E6D59C] dark:border-[#574B24] text-[#594914] dark:text-[#F3E5AB] text-xs flex items-start space-x-2.5">
                          <span className="text-sm">⚠️</span>
                          <div>
                            <span className="font-bold font-serif">Bar Tip: </span>
                            {recipe.specialNotes}
                          </div>
                        </div>
                      )}

                      {/* Ingredients */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B5323] dark:text-[#8CB066] mb-1.5 flex items-center gap-1">
                          <span>🍸</span> Ingredients
                        </h3>
                        <ul className="grid grid-cols-1 gap-1 pl-1">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="text-xs flex justify-between border-b border-[#E2DFD2]/60 dark:border-[#2A3527]/60 py-1">
                              <span className="font-medium text-[#2D3328] dark:text-[#D8DDD5]">{ing.item}</span>
                              <span className="text-[#8C7A5B] dark:text-[#D4AF37] font-mono font-semibold">{ing.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Procedure */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B5323] dark:text-[#8CB066] mb-1.5 flex items-center gap-1">
                          <span>📜</span> Procedure ({recipe.method})
                        </h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-[#4A5245] dark:text-[#BAC2B6] pl-1">
                          {recipe.procedure.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Garnish */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B5323] dark:text-[#8CB066] mb-1.5 flex items-center gap-1">
                          <span>🍋</span> Garnish
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {recipe.garnish.map((g, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] text-[#4A5245] dark:text-[#BAC2B6] font-medium"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 text-[#8C7A5B] text-sm">
                No drinks found matching your search.
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}