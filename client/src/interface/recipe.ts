export interface IRecipeData {
  data: IRecipe[];
  total: number;
}

export interface IRecipe {
  _id: string;
  name: string;
  desc: string;
  ingredients: string;
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
}
