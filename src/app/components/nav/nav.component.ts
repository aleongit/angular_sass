import { Component, OnInit } from '@angular/core';
import { CATS } from '../../utils/constants';
import { Post } from '../../utils/interfaces';
import {
  RouterLink,
  RouterLinkActive,
  IsActiveMatchOptions,
  ActivatedRoute,
} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, ThemeSwitcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  posts: Post[] = [];
  cats = CATS;
  defaultPage: number = 1;
  theme!: 'light' | 'dark' | 'auto' | null;

  //paràmetres per mantenir el routerlink actiu encara que hi hagi paràmetres
  readonly myMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
    this.getPosts();
  }

  getQueryParams(): void {
    //query params
    this.route.queryParamMap.subscribe((params: any) => {
      const theme = params.get('theme');
      theme ? (this.theme = theme) : (this.theme = 'light');
      //console.log(this.mode);
    });
  }

  //Observable data with service
  getPosts(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
    console.log('getPosts()!');
    //objectToJSON(this.posts);
  }
}
