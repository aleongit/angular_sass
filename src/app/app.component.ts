import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarkdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideMarkdown({ loader: HttpClient })],
})
export class AppComponent {
  title = 'angular_sass';
}
