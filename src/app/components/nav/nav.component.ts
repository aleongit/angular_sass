import { Component } from '@angular/core';
import { POSTS, CATS } from '../../utils/constants';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  posts = POSTS;
  cats = CATS;
  defaultPage: number = 1;
}
