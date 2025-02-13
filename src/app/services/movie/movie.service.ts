import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly apiKey = environment.tmdbConfig.apiKey
  private readonly apiUrl = environment.tmdbConfig.apiUrl

  constructor(
    private readonly http: HttpClient,
  ) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}`)
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`)
  }

  addToFavorites(userId: string, movieId: number): Promise<void> {
    return new Promise((resolve, reject) => {});
    // return this.db.object(`favorites/${userId}/${movieId}`).set(true)
  }

  removeFromFavorites(userId: string, movieId: number): Promise<void> {
    return new Promise((resolve, reject) => {});

    // return this.db.object(`favorites/${userId}/${movieId}`).remove()
  }

   getFavorites(userId: string): Observable<number[]> {
    return new Observable((observer) => {
      observer.next([]);
      observer.complete();
    }
    );

  //   return this.db
  //     .list(`favorites/${userId}`)
  //     .snapshotChanges()
  //     .pipe(map((changes) => changes.map((c) => Number.parseInt(c.key!, 10))))
  }

  getFavoriteMovies(userId: string): Observable<any[]> {
    return this.getFavorites(userId).pipe(
      switchMap((movieIds) => {
        const movieObservables = movieIds.map((id) => this.getMovieDetails(id))
        return from(Promise.all(movieObservables))
      }),
    )
  }

  addMovie(movie: any): Promise<void> {
    // Ajoute un nouveau film à la base de données Firebase
    this.http.post(`${environment.firebaseConfig.databaseURL}/movies.json`, {
      movie    
    }).subscribe((response) => {
      console.log(response);
    });
    return new Promise((resolve, reject) => {
      // Add your logic here
      resolve();
    });
  }

  getCustomMovies(): Observable<any[]> {
    // Récupère les films personnalisés ajoutés par les administrateurs
    return new Observable((observer) => {
      observer.next([]);
      observer.complete();
    }
    );
    // return this.db
    //   .list("movies")
    //   .snapshotChanges()
    //   .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...(c.payload.val() as {}) }))))
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`)
  }

  getUsers(): Observable<any[]> {
    return new Observable((observer) => {
      observer.next([]);
      observer.complete();
    }
    );
    // return this.db
    //   .list("users")
    //   .snapshotChanges()
    //   .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...(c.payload.val() as {}) }))))
  }

  toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    return new Promise((resolve, reject) => {});

    //return this.db.object(`users/${userId}`).update({ isActive })
  }

  getMatchingUsers(userId: string): Observable<any[]> {
    return this.getFavorites(userId).pipe(
      switchMap((userFavorites) =>
        this.getUsers().pipe(
          switchMap((users) => {
            const observables = users
              .filter((user) => user.key !== userId)
              .map((user) =>
                this.getFavorites(user.key).pipe(
                  map((otherFavorites) => {
                    const matchingFavorites = userFavorites.filter((id) => otherFavorites.includes(id))
                    const matchPercentage = (matchingFavorites.length / userFavorites.length) * 100
                    return { userId: user.key, matchPercentage }
                  })
                )
              )

            return forkJoin(observables) // Utiliser forkJoin pour attendre la complétion de tous les observables
          }),
          map((matches) => matches.filter((match) => match.matchPercentage >= 75))
        )
      )
    )
  }
}
