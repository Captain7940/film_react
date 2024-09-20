export interface FilmQueryType {
  name?: string;
  author?: string;
  category?: number;
  current?: number;
  pageSize?: number;
  all?: boolean;
}

export interface FilmType {
  name: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  _id?: string;
}
