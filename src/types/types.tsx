// How to define types in TypeScript.
// This is the type of a movie.
export interface Movie {
  _id: string;
  title: string;
  genre: { _id: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishDate: string;
  liked: boolean;
}

export interface SortColumn {
  path: string;
  order: string;
}

export interface Column {
  path: string;
  key?: string;
  label?: string;
  content?: (arg: any) => void;
}