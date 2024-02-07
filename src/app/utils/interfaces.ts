export interface Post {
  id: number;
  name: string;
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

//from angular router
interface IsActiveMatchOptions {
  matrixParams: 'exact' | 'subset' | 'ignored';
  queryParams: 'exact' | 'subset' | 'ignored';
  paths: 'exact' | 'subset';
  fragment: 'exact' | 'ignored';
}
