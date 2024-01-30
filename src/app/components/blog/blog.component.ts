import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../utils/constants';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { objectToJSON } from '../../utils/helpers';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  id?: string | null;
  cat?: string | null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getParams();
  }

  //Observable data with service
  getPosts(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
    //objectToJSON(this.posts);
  }

  getParams(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.cat = params.get('cat');
      console.log(this.id);
      console.log(this.cat);
    });
  }
}
