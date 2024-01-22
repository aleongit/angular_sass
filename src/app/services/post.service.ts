import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS, Post } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}

  //get and return observable data with 'of'
  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }
}
