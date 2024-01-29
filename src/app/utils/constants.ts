export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const POSTS: Post[] = [
  {
    id: 'variables',
    title: 'Variables',
    description: 'Sass uses the $ symbol to make something a variable',
    category: 'learn',
  },
  {
    id: 'nesting',
    title: 'Nesting',
    description:
      'This is a great way to organize your CSS and make it more readable',
    category: 'learn',
  },
  {
    id: 'partials',
    title: 'Partials',
    description:
      'This is a great way to modularize your CSS and help keep things easier to maintain',
    category: 'learn',
  },
  {
    id: 'modules',
    title: 'Modules',
    description: 'You don’t have to write all your Sass in a single file',
    category: 'learn',
  },
  {
    id: 'mixins',
    title: 'Mixins',
    description:
      'A mixin lets you make groups of CSS declarations that you want to reuse throughout your site',
    category: 'learn',
  },
  {
    id: 'extend',
    title: 'Extend',
    description:
      'Using @extend lets you share a set of CSS properties from one selector to another',
    category: 'learn',
  },
  {
    id: 'operators',
    title: 'Operators',
    description:
      'Sass has a handful of standard math operators like +, -, *, math.div(), and %',
    category: 'learn',
  },
  {
    id: 'syntax',
    title: 'Syntax',
    description:
      'Sass supports two different syntaxes. Each one can load the other, so it’s up to you and your team which one to choose',
    category: 'doc',
  },

  {
    id: 'parsing-stylesheet',
    title: 'Parsing a Stylesheet',
    description:
      'A Sass stylesheet is parsed from a sequence of Unicode code points. It’s parsed directly, without first being converted to a token stream',
    category: 'doc',
  },
];

export const CATS: string[] = ['learn', 'doc'];
