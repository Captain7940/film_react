export interface FilmQueryType {
  name?: string;
  author?: string;
  category?: number;
  current?: number;
  pageSize?: number;
}

export interface FilmType {
  name: string;
  author: string;
  category: string;
  cover: string;
  description: string;
}
