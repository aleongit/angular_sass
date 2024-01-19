import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/post/:id', component: PostComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
