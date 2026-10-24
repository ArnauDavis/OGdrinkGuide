import { useState } from 'react';
import recipesData from '../data/recipes.json';
import { type Recipe } from '../types/recipe';

export default function QuizView() {
  const allRecipes = recipesData as Recipe[];

  const [deck, setDeck] = useState<Recipe[]>(() =>
    [...allRecipes].sort(() => Math.random() - 0.5)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, studied: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const currentRecipe = deck[currentIndex];

  const handleAnswer = (passed: boolean) => {
    setScore((prev) => ({
      correct: prev.correct + (passed ? 1 : 0),
      studied: prev.studied + 1,
    }));

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
    const percentage =
      deck.length > 0
        ? Math.round((score.correct / deck.length) * 100)
        : 0;

    const message =
      percentage >= 90
        ? 'Outstanding work!'
        : percentage >= 70
          ? 'You are getting there!'
          : 'Keep practicing!';

    return (
      <main className="mx-auto max-w-lg space-y-6 px-4 pb-10 pt-8 sm:pt-12">
        <section className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center shadow-lg sm:p-9">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--accent-color)] via-[var(--gold-color)] to-[var(--accent-color)]" />

          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--gold-color)]/40 bg-[var(--gold-soft)] text-3xl">
              🏆
            </div>
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Study Session Complete
          </p>

          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
            {message}
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
            You made it through the deck. Here is how you did.
          </p>

          <div className="my-8 flex justify-center">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--accent-color) ${percentage * 3.6}deg, var(--bg-secondary) ${percentage * 3.6}deg)`,
              }}
              role="img"
              aria-label={`${percentage}% correct`}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[var(--bg-card)]">
                <span className="font-serif text-4xl font-bold text-[var(--accent-color)]">
                  {percentage}%
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Correct
                </span>
              </div>
            </div>
          </div>

          <div className="mb-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4">
              <p className="text-2xl font-bold text-[var(--accent-color)]">
                {score.correct}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Nailed it
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {score.studied - score.correct}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                To practice
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={restartQuiz}
            className="w-full rounded-xl bg-[var(--accent-color)] px-5 py-3 text-sm font-bold text-[var(--accent-contrast)] shadow-sm transition hover:opacity-90"
          >
            ↻ Study Again
          </button>

          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Your next session will have a freshly shuffled deck.
          </p>
        </section>
      </main>
    );
  }

  if (!currentRecipe) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10">
        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center">
          <h2 className="font-serif text-xl font-bold text-[var(--text-primary)]">
            No recipes available
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Add recipes to your dataset to begin studying.
          </p>
        </section>
      </main>
    );
  }

  const progress = ((currentIndex + 1) / deck.length) * 100;

  return (
    <main className="mx-auto max-w-lg space-y-5 px-4 pb-10 pt-6 sm:pt-8">
      {/* Study Header */}
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-5 bg-[var(--gold-color)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Bartender Training
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Recipe Challenge
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Learn the specs, one drink at a time.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2 text-right shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Score
            </p>
            <p className="font-mono text-sm font-bold text-[var(--accent-color)]">
              {score.correct} / {score.studied}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--text-primary)]">
              Card {currentIndex + 1} of {deck.length}
            </span>
            <span className="text-[var(--text-muted)]">
              {Math.round(progress)}% complete
            </span>
          </div>

          <div
            className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={deck.length}
            aria-valuenow={currentIndex + 1}
          >
            <div
              className="h-full rounded-full bg-[var(--accent-color)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Flashcard */}
      <section
        className={`overflow-hidden rounded-3xl border bg-[var(--bg-card)] shadow-lg transition-colors ${
          isFlipped
            ? 'border-[var(--accent-color)]/40'
            : 'border-[var(--border-color)]'
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-[var(--accent-color)] via-[var(--gold-color)] to-transparent" />

        {!isFlipped ? (
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            aria-label={`Reveal recipe for ${currentRecipe.name}`}
            className="flex min-h-[370px] w-full flex-col items-center justify-center px-6 py-10 text-center transition-colors hover:bg-[var(--accent-soft)]/20 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--focus-ring)] sm:min-h-[410px] sm:px-9"
          >
            <span className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-[var(--gold-color)]/40 bg-[var(--accent-soft)] text-4xl shadow-sm">
              🍹
            </span>

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Name the specifications
            </p>

            <h3 className="mt-3 font-serif text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              {currentRecipe.name}
            </h3>

            <span className="mt-6 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-medium text-[var(--text-muted)]">
              🍸 {currentRecipe.glass}
            </span>

            <div className="mt-10 text-xs font-semibold text-[var(--accent-color)]">
              ↻ Tap to reveal recipe
            </div>
          </button>
        ) : (
          <div className="space-y-6 p-5 sm:p-7">
            {/* Recipe Heading */}
            <div className="border-b border-[var(--border-color)] pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Recipe Specifications
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--text-primary)]">
                {currentRecipe.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {[currentRecipe.glass, currentRecipe.method].map(
                  (detail, idx) => (
                    <span
                      key={`${detail}-${idx}`}
                      className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-primary)]"
                    >
                      {detail}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Ingredients */}
            <section>
              <h4 className="mb-3 font-serif text-base font-bold text-[var(--text-primary)]">
                🍸 Ingredients
              </h4>

              <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
                {currentRecipe.ingredients.map((ingredient, idx) => (
                  <div
                    key={`${ingredient.item}-${idx}`}
                    className={`flex items-start justify-between gap-3 px-3 py-2.5 ${
                      idx !== currentRecipe.ingredients.length - 1
                        ? 'border-b border-[var(--border-color)]'
                        : ''
                    } ${
                      idx % 2 === 1
                        ? 'bg-[var(--bg-primary)]/60'
                        : 'bg-[var(--bg-card)]'
                    }`}
                  >
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {ingredient.item}
                    </span>
                    <span className="shrink-0 rounded-md bg-[var(--accent-soft)] px-2 py-1 font-mono text-xs font-bold text-[var(--accent-color)]">
                      {ingredient.amount}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Preparation */}
            <section>
              <h4 className="mb-3 font-serif text-base font-bold text-[var(--text-primary)]">
                📜 Preparation
              </h4>

              <ol className="space-y-3">
                {currentRecipe.procedure.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--gold-color)]/50 bg-[var(--bg-secondary)] font-mono text-[10px] font-bold text-[var(--accent-color)]">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 text-xs leading-relaxed text-[var(--text-primary)]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Garnish */}
            <section>
              <h4 className="mb-3 font-serif text-base font-bold text-[var(--text-primary)]">
                🍋 Garnish
              </h4>

              <div className="flex flex-wrap gap-2">
                {currentRecipe.garnish.map((garnish, idx) => (
                  <span
                    key={`${garnish}-${idx}`}
                    className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 text-xs font-medium text-[var(--text-primary)]"
                  >
                    {garnish}
                  </span>
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="w-full rounded-lg border border-[var(--border-color)] py-2.5 text-xs font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            >
              Hide Specifications
            </button>
          </div>
        )}
      </section>

      {/* Answer Buttons */}
      {isFlipped ? (
        <section className="space-y-3">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            How well did you know this drink?
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleAnswer(false)}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-[var(--bg-card)] px-3 py-3 text-xs font-bold text-red-600 shadow-sm transition hover:bg-red-500/5 active:scale-[0.98] dark:text-red-400"
            >
              ↻ Still Learning
            </button>

            <button
              type="button"
              onClick={() => handleAnswer(true)}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--accent-color)] px-3 py-3 text-xs font-bold text-[var(--accent-contrast)] shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            >
              ✓ Nailed It!
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsFlipped(true)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-color)] px-5 py-3 text-sm font-bold text-[var(--accent-contrast)] shadow-sm transition hover:opacity-90 active:scale-[0.99]"
        >
          Reveal Recipe →
        </button>
      )}

      <p className="pb-2 text-center text-[10px] text-[var(--text-muted)]">
        Consistent practice builds confidence behind the bar.
      </p>
    </main>
  );
}