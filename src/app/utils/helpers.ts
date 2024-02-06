import { Post } from './interfaces';

export const objectToJSON = (data: Post[]) => {
  // Converting JS object to JSON string
  const json = JSON.stringify(data);
  console.log(json);
};
