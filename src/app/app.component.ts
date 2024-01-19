import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarkdownModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideMarkdown()],
})
export class AppComponent {
  title = 'angular_sass';
}
