import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MARKED_OPTIONS } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// enable default sanitization
provideMarkdown();

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE,
});

// using specific options with ValueProvider and passing HttpClient
provideMarkdown({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useValue: {
      gfm: true,
      breaks: false,
      pedantic: false,
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown({ loader: HttpClient }),
  ],
};
