import React, { useState, useMemo } from 'react';
import recipesData from '../data/recipes.json';
import { type Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

export default function CatalogView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  return (
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

      {/* Horizontal Filter Pills */}
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

      {/* Drink Cards List */}
      <div className="space-y-3">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 text-[#8C7A5B] text-sm">
            No drinks found matching your search.
          </div>
        )}
      </div>

    </main>
  );
}