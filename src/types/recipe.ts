export interface Ingredient {
  amount: string;
  item: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  glass: string;
  method: string;
  ingredients: Ingredient[];
  procedure: string[];
  garnish: string[];
  specialNotes?: string;
  tags: string[];
}

export type ViewMode = 'catalog' | 'quiz';