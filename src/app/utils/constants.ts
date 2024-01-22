export interface Post {
  id: string;
  title: string;
  description: string;
}

export const POSTS: Post[] = [
  {
    id: 'variables',
    title: 'Variables',
    description: 'Sass uses the $ symbol to make something a variable',
  },
  {
    id: 'nesting',
    title: 'Nesting',
    description:
      'This is a great way to organize your CSS and make it more readable',
  },
  {
    id: 'partials',
    title: 'Partials',
    description:
      'This is a great way to modularize your CSS and help keep things easier to maintain',
  },
  {
    id: 'modules',
    title: 'Modules',
    description: 'You don’t have to write all your Sass in a single file',
  },
  {
    id: 'mixins',
    title: 'Mixins',
    description:
      'A mixin lets you make groups of CSS declarations that you want to reuse throughout your site',
  },
];
