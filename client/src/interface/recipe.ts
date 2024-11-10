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
  save: boolean;
  reviews: IReview[];
  cookTime: string;
  category: [];
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
