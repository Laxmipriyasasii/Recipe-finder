 export interface Recipe {
  id: number;
  name: string;
  mealType: string;
  img: string;
  difficulty: string;
  description: string;
  author: string;
  total_ingredients: number;
  calories: number;
  level: string;
  total_time:string,
  ingredients: string[];
  preparation: string[];
  isFavorite?: boolean;  // Optional field for favorite status
}
