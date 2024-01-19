import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { POSTS } from '../../utils/constants';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  posts = POSTS;
}
