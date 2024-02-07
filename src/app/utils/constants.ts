import { Post } from './interfaces';

//canviat a fitxer db.json
export const POSTS: Post[] = [
  {
    id: 1,
    name: 'variables',
    title: 'Variables',
    description: 'Sass uses the $ symbol to make something a variable',
    category: 'learn',
  },
  //...
];

export const CATS: string[] = ['home', 'learn', 'doc'];
