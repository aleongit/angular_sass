import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [],
})
export class PostComponent implements OnInit {
  post?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const name = params.get('name');
      const cat = params.get('cat');
      console.log(name);
      console.log(cat);
      //this.post = `api/test/test.md`;
      this.post = `/api/blog/${cat}/${name}.md`;
      console.log(this.post);
    });
  }
}
