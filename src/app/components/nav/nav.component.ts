import { Component, OnInit } from '@angular/core';
import { CATS, POSTS } from '../../utils/constants';
import { Post } from '../../utils/interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IsActiveMatchOptions } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  posts: Post[] = [];
  cats = CATS;
  defaultPage: number = 1;

  //paràmetres per mantenir el routerlink actiu encara que hi hagi paràmetres
  readonly myMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  //Observable data with service
  getPosts(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
    console.log('getPosts()!');
    //objectToJSON(this.posts);
  }
}
