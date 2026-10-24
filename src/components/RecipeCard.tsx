import { type Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isExpanded: boolean;
  onToggle: () => void;
  onBackToTop: () => void;
}

export default function RecipeCard({
  recipe,
  isExpanded,
  onToggle,
  onBackToTop,
}: RecipeCardProps) {
  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-[var(--border-color)]
        bg-[var(--bg-card)]
        shadow-[var(--shadow-card)]
        transition-all duration-200
        hover:border-[var(--gold-color)]
      "
    >
      {/* Card Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="
          flex w-full items-center justify-between gap-3
          p-4 text-left transition-colors
          hover:bg-[var(--accent-soft)]/30
          focus-visible:outline-2
          focus-visible:outline-offset-[-3px]
          focus-visible:outline-[var(--focus-ring)]
        "
      >
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-base font-bold text-[var(--text-primary)] sm:text-lg">
              {recipe.name}
            </h2>

            <span
              className="
                rounded-md border border-[var(--border-color)]
                bg-[var(--bg-secondary)]
                px-2 py-1 text-[9px] font-bold
                uppercase tracking-wider
                text-[var(--text-muted)]
              "
            >
              {recipe.glass}
            </span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
            {recipe.ingredients
              .map((ingredient) => `${ingredient.amount} ${ingredient.item}`)
              .join(' • ')}
          </p>
        </div>

        <span
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full border border-[var(--border-color)]
            bg-[var(--bg-secondary)]
            text-sm font-bold text-[var(--accent-color)]
          "
          aria-hidden="true"
        >
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/60 px-4 pb-4 pt-5 sm:px-5">
          {/* Bar Tip */}
          {recipe.specialNotes && (
            <div
              className="
                flex items-start gap-3 rounded-xl
                border border-[var(--gold-color)]/40
                bg-[var(--gold-soft)] p-3.5
                text-xs leading-relaxed
                text-[var(--text-primary)]
              "
            >
              <span className="text-base" aria-hidden="true">
                💡
              </span>

              <div>
                <p className="mb-1 font-bold text-[var(--accent-color)]">
                  Bartender's Note
                </p>
                <p>{recipe.specialNotes}</p>
              </div>
            </div>
          )}

          {/* Ingredients */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-base font-bold text-[var(--text-primary)]">
              <span aria-hidden="true">🍸</span>
              Ingredients
            </h3>

            <ul className="overflow-hidden rounded-xl border border-[var(--border-color)]">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={`${ingredient.item}-${index}`}
                  className={`
                    flex items-center justify-between gap-3 px-3 py-2.5
                    ${
                      index !== recipe.ingredients.length - 1
                        ? 'border-b border-[var(--border-color)]'
                        : ''
                    }
                    ${
                      index % 2 === 1
                        ? 'bg-[var(--bg-secondary)]/50'
                        : 'bg-[var(--bg-card)]'
                    }
                  `}
                >
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {ingredient.item}
                  </span>

                  <span className="shrink-0 font-mono text-xs font-bold text-[var(--accent-color)]">
                    {ingredient.amount}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Procedure */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-base font-bold text-[var(--text-primary)]">
              <span aria-hidden="true">📜</span>
              Preparation
              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                {recipe.method}
              </span>
            </h3>

            <ol className="space-y-3">
              {recipe.procedure.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="
                      flex h-6 w-6 shrink-0 items-center justify-center
                      rounded-full border border-[var(--gold-color)]/50
                      bg-[var(--bg-secondary)]
                      font-mono text-[10px] font-bold
                      text-[var(--accent-color)]
                    "
                  >
                    {index + 1}
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
            <h3 className="mb-3 flex items-center gap-2 font-serif text-base font-bold text-[var(--text-primary)]">
              <span aria-hidden="true">🍋</span>
              Garnish
            </h3>

            <div className="flex flex-wrap gap-2">
              {recipe.garnish.map((garnish, index) => (
                <span
                  key={`${garnish}-${index}`}
                  className="
                    rounded-lg border border-[var(--border-color)]
                    bg-[var(--bg-card)] px-3 py-2
                    text-xs font-medium text-[var(--text-primary)]
                  "
                >
                  {garnish}
                </span>
              ))}
            </div>
          </section>

          {/* Back to Top */}
          <div className="border-t border-[var(--border-color)] pt-4">
            <button
              type="button"
              onClick={onBackToTop}
              className="
                flex min-h-11 w-full items-center justify-center gap-2
                rounded-xl border border-[var(--border-color)]
                bg-[var(--bg-card)] px-4 py-2.5
                text-xs font-bold text-[var(--accent-color)]
                transition-colors
                hover:border-[var(--gold-color)]
                hover:bg-[var(--accent-soft)]
              "
            >
              <span aria-hidden="true">↑</span>
              Back to Top
            </button>
          </div>
        </div>
      )}
    </div>
  );
}