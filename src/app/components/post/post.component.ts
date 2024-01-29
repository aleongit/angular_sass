import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

// enable default sanitization
provideMarkdown();

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE,
});

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [provideMarkdown({ loader: HttpClient })],
})
export class PostComponent implements OnInit {
  post?: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    /*
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.post = './assets/blog/post/' + id + '.md';
    */

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const cat = params.get('cat');
      console.log(id);
      console.log(cat);
      //this.post = './assets/blog/' + cat + '/' + id + '.md';
      this.post = `./assets/blog/${cat}/${id}.md`;
    });
  }
}
