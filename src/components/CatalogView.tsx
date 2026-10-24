import { useState, useMemo } from 'react';
import recipesData from '../data/recipes.json';
import { type Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

export default function CatalogView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedRecipeId, setExpandedRecipeId] = useState<
    Recipe['id'] | null
  >(null);

  const recipes = recipesData as Recipe[];

  const categories = useMemo(() => {
    const cats = recipes.map((recipe) => recipe.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        recipe.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();

      if (!query) return matchesCategory;

      const matchesName = recipe.name.toLowerCase().includes(query);

      const matchesTags = recipe.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      const matchesIngredients = recipe.ingredients.some((ingredient) =>
        ingredient.item.toLowerCase().includes(query)
      );

      return (
        matchesCategory &&
        (matchesName || matchesTags || matchesIngredients)
      );
    });
  }, [recipes, searchQuery, selectedCategory]);

  const handleToggleRecipe = (recipeId: Recipe['id']) => {
    setExpandedRecipeId((currentId) =>
      currentId === recipeId ? null : recipeId
    );
  };

  const handleBackToTop = () => {
    setExpandedRecipeId(null);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="mx-auto max-w-3xl space-y-5 px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      {/* Page Heading */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[var(--gold-color)]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Behind the Bar
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Drink Recipe Catalog
        </h2>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Your quick reference for recipes, ingredients, and preparation.
        </p>
      </section>

      {/* Search Bar */}
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-muted)]"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          type="search"
          placeholder="Search drinks, spirits, or ingredients..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          aria-label="Search drink recipes"
          className="
            min-h-12 w-full rounded-xl
            border border-[var(--border-color)]
            bg-[var(--bg-card)]
            py-3 pl-11 pr-11 text-sm
            text-[var(--text-primary)]
            shadow-sm transition
            placeholder:text-[var(--text-muted)]
            focus:border-[var(--accent-color)]
            focus:outline-none
            focus:ring-2 focus:ring-[var(--accent-soft)]
          "
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="
              absolute inset-y-0 right-0 flex items-center
              px-4 text-sm text-[var(--text-muted)]
              transition hover:text-[var(--text-primary)]
            "
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div
        className="flex gap-2 overflow-x-auto pb-2"
        aria-label="Filter recipes by category"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isSelected}
              className={`
                min-h-9 shrink-0 rounded-full border px-4 py-2
                text-xs font-semibold transition-all
                ${
                  isSelected
                    ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-[var(--accent-contrast)] shadow-sm'
                    : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--gold-color)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
        <p className="text-xs text-[var(--text-muted)]">
          Showing{' '}
          <span className="font-bold text-[var(--text-primary)]">
            {filteredRecipes.length}
          </span>{' '}
          of {recipes.length} drink recipes
        </p>

        {(searchQuery || selectedCategory !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setExpandedRecipeId(null);
            }}
            className="shrink-0 text-xs font-semibold text-[var(--accent-color)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Recipe Cards */}
      <div className="space-y-3">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isExpanded={expandedRecipeId === recipe.id}
            onToggle={() => handleToggleRecipe(recipe.id)}
            onBackToTop={handleBackToTop}
          />
        ))}

        {filteredRecipes.length === 0 && (
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-12 text-center shadow-sm">
            <span className="text-3xl" aria-hidden="true">
              🍸
            </span>

            <h3 className="mt-3 font-serif text-lg font-bold text-[var(--text-primary)]">
              No drinks found
            </h3>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Try a different search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 rounded-lg bg-[var(--accent-color)] px-4 py-2 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-90"
            >
              Show all recipes
            </button>
          </div>
        )}
      </div>
    </main>
  );
}