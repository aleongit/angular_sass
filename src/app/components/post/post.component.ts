import { Component } from '@angular/core';
import {
  RouterOutlet,
  Router,
  ActivatedRoute,
  ParamMap,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { SecurityContext } from '@angular/core';

// enable default sanitization
provideMarkdown();

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE,
});

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterOutlet, MarkdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [provideMarkdown({ loader: HttpClient })],
})
export class PostComponent {
  post?: string;
  href?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) //private service: HeroService
  {}

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //this.href = window.location.href;
    this.post = './assets/blog/post/' + id + '.md';
  }
}
