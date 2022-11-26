import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Movie } from './store/movie.model';
import * as movieActions from './store/movie.actions';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly endpoint = 'https://api.themoviedb.org/3/movie/';
  private readonly apiKey = '6b28bd384ff7dab3d4a48925ed9fee07';

  constructor(
    private http: HttpClient,
    private store: Store<{ movies: { movies: Movie[] } }>
  ) {}

  getPopularMovies() {
    return this.http
      .get(
        `${this.endpoint}popular?api_key=${this.apiKey}&language=en-US&page=1`
      )
      .pipe(
        tap((res: any) => {
          this.store.dispatch(new movieActions.GetMovies(res.results));
        })
      );
  }

  fetchMovieDetails(movieID: number) {
    return this.http.get(
      `${this.endpoint}${movieID}?api_key=${this.apiKey}&language=en-US`
    );
  }

  fetchMovieCast(movieID: number) {
    return this.http
      .get(
        ` ${this.endpoint}${movieID}/credits?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(map((res: any) => res.cast));
  }

  fetchMovieCrew(movieID: number) {
    return this.http
      .get(
        ` ${this.endpoint}${movieID}/credits?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(map((res: any) => res.crew));
  }
}
