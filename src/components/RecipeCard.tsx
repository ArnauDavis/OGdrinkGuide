import React, { useState } from 'react';
import { type Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:border-[#3B5323]/50">
      
      {/* Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
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
          
          {recipe.specialNotes && (
            <div className="p-3 rounded-lg bg-[#FDF8E2] dark:bg-[#2C291B] border border-[#E6D59C] dark:border-[#574B24] text-[#594914] dark:text-[#F3E5AB] text-xs flex items-start space-x-2.5">
              <span className="text-sm">⚠️</span>
              <div>
                <span className="font-bold font-serif">Bar Tip: </span>
                {recipe.specialNotes}
              </div>
            </div>
          )}

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
}