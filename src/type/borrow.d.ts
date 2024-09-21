import { FilmType } from "./film";

export interface BorrowQueryType {
  name?: string;
  author?: string;
  category?: number;
  current?: number;
  pageSize?: number;
}

export interface BorrowType {
  film: FilmType;
  // todo user ts
  user: any;
}
