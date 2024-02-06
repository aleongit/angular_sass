import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { POSTS } from '../utils/constants';
import { Post, Pagination } from '../utils/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'http://localhost:3000/posts'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  //get and return observable data with 'of'
  /*
  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }
  */

  getPosts(): Observable<Post[]> {
    return (
      this.http
        //.get<Post[]>(this.postsUrl, this.httpOptions)
        .get<Post[]>(this.postsUrl)
        .pipe(tap(() => console.log('fetched posts!')))
    );
  }

  /*
  Paginate [json-server]
  - page
  - per_page (default = 10)
  GET /posts?_page=1&_per_page=25
  */
  getPaginatedPosts(
    page: number,
    itemsPerPage: number,
    category: string
  ): Observable<Pagination> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', itemsPerPage.toString())
      .set('category', category);

    return this.http.get<Pagination>(this.postsUrl, { params });
  }

  /* examples with Observable ________________________________________________________*/
  /** GET heroes from the server */
  /*
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  */

  /** GET hero by id. Will 404 if id not found */
  /*
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  */

  /* examples with 'of()' ________________________________________________________*/

  /* getHeroes with RxJs 'of()'*/
  /*
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  */

  /* getHeroes with RxJs 'of()'*/
  /*
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  */

  /* examples with async, await and fetch' ______________________________________________*/
  /*
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
  */
}
