import React, { useState, useMemo } from 'react';
import recipesData from '../data/recipes.json';
import { type Recipe } from '../types/recipe';

export default function QuizView() {
  const allRecipes = recipesData as Recipe[];

  // Shuffle recipes when quiz starts or resets
  const [deck, setDeck] = useState<Recipe[]>(() => 
    [...allRecipes].sort(() => Math.random() - 0.5)
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, studied: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const currentRecipe = deck[currentIndex];

  const handleAnswer = (passed: boolean) => {
    if (passed) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1, studied: prev.studied + 1 }));
    } else {
      setScore((prev) => ({ ...prev, studied: prev.studied + 1 }));
    }

    setIsFlipped(false);

    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setDeck([...allRecipes].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore({ correct: 0, studied: 0 });
    setIsFlipped(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score.correct / deck.length) * 100);
    return (
      <main className="max-w-md mx-auto px-4 pt-8 text-center space-y-6">
        <div className="bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] rounded-2xl p-8 shadow-sm space-y-4">
          <span className="text-4xl">🎉</span>
          <h2 className="text-xl font-serif font-bold text-[#3B5323] dark:text-[#8CB066]">
            Quiz Complete!
          </h2>
          <p className="text-sm text-[#555C50] dark:text-[#B1B8AE]">
            You nailed <span className="font-bold text-[#3B5323] dark:text-[#8CB066]">{score.correct}</span> out of {deck.length} drinks ({percentage}%).
          </p>

          <button
            onClick={restartQuiz}
            className="w-full py-3 rounded-xl bg-[#3B5323] hover:bg-[#2f421b] text-white font-medium text-sm transition shadow"
          >
            Study Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
      
      {/* Progress Header */}
      <div className="flex items-center justify-between text-xs text-[#8C7A5B] dark:text-[#A39B8B] font-medium px-1">
        <span>Card {currentIndex + 1} of {deck.length}</span>
        <span>Score: {score.correct} / {score.studied}</span>
      </div>

      {/* Flashcard Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[380px] bg-white dark:bg-[#20291E] border border-[#E2DFD2] dark:border-[#2A3527] rounded-2xl shadow-sm p-6 cursor-pointer flex flex-col justify-between transition-all duration-200 hover:border-[#3B5323]"
      >
        {!isFlipped ? (
          /* Front of Card (Question) */
          <div className="my-auto text-center space-y-4 py-12">
            <span className="text-3xl p-3 rounded-2xl bg-[#3B5323]/10 dark:bg-[#5C7F35]/20 inline-block text-[#3B5323] dark:text-[#7A9A5B]">
              🍹
            </span>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#8C7A5B] dark:text-[#D4AF37] font-semibold">
                What are the specs for...
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#2D3328] dark:text-[#F0F2EE]">
                {currentRecipe.name}
              </h2>
            </div>
            <div className="pt-4">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4F3EE] dark:bg-[#161D15] text-[#555C50] dark:text-[#9DA698] font-medium border border-[#E2DFD2] dark:border-[#2A3527]">
                Glass: {currentRecipe.glass}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 pt-6 animate-pulse">
              Tap card to reveal recipe 👇
            </p>
          </div>
        ) : (
          /* Back of Card (Answer / Details) */
          <div className="space-y-4 text-left animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-[#E2DFD2] dark:border-[#2A3527] pb-2">
              <h3 className="font-serif font-bold text-base text-[#3B5323] dark:text-[#8CB066]">
                {currentRecipe.name}
              </h3>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#F4F3EE] dark:bg-[#161D15] text-[#555C50] font-semibold">
                {currentRecipe.method}
              </span>
            </div>

            {/* Ingredients */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A5B]">Ingredients</h4>
              <ul className="space-y-1">
                {currentRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="text-xs flex justify-between border-b border-[#E2DFD2]/40 dark:border-[#2A3527]/40 py-0.5">
                    <span className="font-medium text-[#2D3328] dark:text-[#D8DDD5]">{ing.item}</span>
                    <span className="text-[#8C7A5B] dark:text-[#D4AF37] font-mono font-semibold">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Procedure */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A5B]">Procedure</h4>
              <ol className="list-decimal list-inside space-y-0.5 text-xs text-[#4A5245] dark:text-[#BAC2B6]">
                {currentRecipe.procedure.map((step, idx) => (
                  <li key={idx} className="line-clamp-2">{step}</li>
                ))}
              </ol>
            </div>

            {/* Garnish */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A5B]">Garnish</h4>
              <p className="text-xs text-[#4A5245] dark:text-[#BAC2B6]">
                {currentRecipe.garnish.join(' • ')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Answer Action Buttons (Only active when flipped, or always available) */}
      {isFlipped ? (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleAnswer(false)}
            className="py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-medium text-xs transition shadow-sm hover:bg-red-100"
          >
            ❌ Still Learning
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="py-3 px-4 rounded-xl bg-[#3B5323] hover:bg-[#2f421b] text-white font-medium text-xs transition shadow-sm"
          >
            ✅ Nailed It!
          </button>
        </div>
      ) : (
        <div className="text-center pt-2">
          <button
            onClick={() => setIsFlipped(true)}
            className="w-full py-3 rounded-xl bg-[#3B5323] hover:bg-[#2f421b] text-white font-medium text-xs transition shadow-sm"
          >
            Flip Card
          </button>
        </div>
      )}

    </main>
  );
}