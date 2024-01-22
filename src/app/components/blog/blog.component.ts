import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../utils/constants';
import { NgFor } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  //Observable data with service
  getPosts(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
  }
}
