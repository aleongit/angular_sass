import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../utils/interfaces';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, PaginationComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  name?: string | null;
  category: string = '';

  //pagination
  paginatedPosts: Post[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit()!');
    //this.getPosts();
    //subscripció a canvis de rutes a url + paràmetres url (page) + get posts
    this.getRoutesParams();
    //subscripció per detectar només canvis de paràmetres url + gest posts
    //this.getQueryParams();
  }

  //Observable data with service
  getPosts(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
    //objectToJSON(this.posts);
  }

  getRoutesParams(): void {
    //paràmetres de les rutes
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name');
      this.category = params.get('cat') ?? '';
      //this.currentPage = Number(params.get('page'));
      console.log(this.name);
      console.log(this.category);

      //dins la subscripció de paramMap, agafar query params
      this.getQueryParams();
    });
  }

  getQueryParams(): void {
    //query params
    this.route.queryParamMap.subscribe((params: any) => {
      const page = Number(params.get('page'));

      //controlar si no hi ha paràmetre 'page'
      page ? (this.currentPage = page) : (this.currentPage = 1);
      console.log(this.currentPage);

      //dins la subscripció, fetch posts
      this.getPaginatedPosts();
    });
  }

  //pagination
  //https://rxjs.dev/deprecations/subscribe-arguments
  getPaginatedPosts(): void {
    this.postService
      .getPaginatedPosts(this.currentPage, this.itemsPerPage, this.category)
      .subscribe({
        next: (data) => {
          console.log('getPaginatedPosts()!');
          console.log(data);
          this.paginatedPosts = data.data;
          this.totalItems = data.items;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log(this.router.url);

    //set url relativa, no passem url, per evitar problemes de "/" a la url
    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });

    //get posts
    //this.getPaginatedPosts();
  }
}
