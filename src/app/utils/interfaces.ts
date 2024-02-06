export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface Pagination {
  data: Post[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}
