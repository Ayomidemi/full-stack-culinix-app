export interface IRecipeData {
  data: IRecipe[];
  total: number;
}

export interface IRecipe {
  _id: string;
  name: string;
  desc: string;
  ingredients: [];
  instructions: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  views: number;
  dislikes: number;
  likes: number;
  kitchen: {
    email: string;
    name: string;
  };
  isFavorite: boolean;
  reviews: IReview[];
  cookTime: string;
  category: [];
  recipe: IStreamlinedFavorites;
  liked: boolean;
  disliked: boolean;
  owner: string;
}

export interface IStreamlinedFavorites {
  _id: string;
  imageUrl: string;
  desc: string;
  name: string;
  createdAt: string;
  views: number;
  dislikes: number;
  likes: number;
  kitchen: {
    email: string;
    name: string;
  };
  isFavorite: boolean;
  liked: boolean;
  disliked: boolean;
}

export interface IReview {
  _id: string;
  userId: string;
  review: string;
  reviewer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
