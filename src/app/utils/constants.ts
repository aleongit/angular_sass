export interface Post {
  id: string;
  url: string;
  title: string;
  description: string;
}

export const POSTS: Post[] = [
  {
    id: 'variables',
    url: '/blog/post/variables',
    title: 'Variables',
    description: 'Sass uses the $ symbol to make something a variable',
  },
  {
    id: 'nesting',
    url: '/blog/post/nesting',
    title: 'Nesting',
    description:
      'This is a great way to organize your CSS and make it more readable',
  },
];
