import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// enable default sanitization
provideMarkdown();

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown({ loader: HttpClient }),
  ],
};
