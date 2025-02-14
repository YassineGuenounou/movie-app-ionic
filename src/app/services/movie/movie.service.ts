import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { forkJoin, from, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from './favorites';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly apiKey = environment.tmdbConfig.apiKey
  private readonly apiUrl = environment.tmdbConfig.apiUrl
  private readonly databaseURL = environment.firebaseConfig.databaseURL
  app = initializeApp(environment.firebaseConfig);
  title='';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getPopularMovies(): Observable<any> {
    const auth = getAuth(this.app);
    this.http.get(`${this.apiUrl}/popular?api_key=${this.apiKey}`).subscribe((response) => {console.log(response)});
    return this.http.get(`${this.apiUrl}/popular?api_key=${this.apiKey}`)
  }

  getMovieDetails(movieId: number): Observable<any> {
   let res= this.http.get(`${this.apiUrl}/${movieId}?api_key=${this.apiKey}`);
    return res;
    }

  addToFavorites(movieId: number): Promise<void> {
    const auth = getAuth(this.app);
    return new Promise((resolve, reject) => {
      this.getMovieDetails(movieId).subscribe({
        next: (movie) => {
          console.log('Movie:', movie.title);
          this.http.post(`${environment.firebaseConfig.databaseURL}/favorites.json`, {
            movieId,
            title:movie.title,
            release_date:movie.release_date,
            poster_path:movie.poster_path,
            userId: auth.currentUser?.uid
          }).subscribe({
            next: (response) => {
              console.log('Added to favorites:', response);
              resolve(void 0);
            },
            error: (err) => reject(err)
          });        },
        error: (err) => reject(err)
      });
   
    });
  }

  removeFromFavorites(userId: string, movieId: number): Observable<void> {
    const auth = getAuth(this.app).currentUser?.uid;
  
    return this.getFavorites(auth!).pipe(
      switchMap((favorites) => {
        const favoriteKey = favorites.find((favorite) => favorite.movieId === movieId && auth === favorite.userId);
        if (favoriteKey) {
          // Delete the favorite
          return this.http.delete<void>(`${this.databaseURL}/favorites/${favoriteKey.id}.json`).pipe(
            map(() => {
              console.log('Removed from favorites');
            })
          );
        } else {
          return throwError(() => new Error('Favorite not found'));
        }
      })
    );
  }

  getFavorites(userId: string): Observable<Favorite[]> {
    return this.http.get<{ [key: string]: Favorite }>(`${this.databaseURL}/favorites.json`).pipe(
      map((response) => {
        const fav: Favorite[] = [];
        if (response) {
          for (const key in response) {
            if (response[key].userId === userId) {              
              fav.push({ ...response[key], id: key });
            }
          }          
          return fav;
        } else {
          return [];
        }
      })
    );
  }

  //   return this.db
  //     .list(`favorites/${userId}`)
  //     .snapshotChanges()
  //     .pipe(map((changes) => changes.map((c) => Number.parseInt(c.key!, 10))))
  

  getFavoriteMovies(userId: string): Observable<Favorite[]> {
    return this.getFavorites(userId).pipe(
      switchMap((favorites) => {        
        const movieObservables = favorites.map((favorite) => 
          this.getMovieDetails(favorite.movieId).pipe(
            map((movie) => ({
              ...favorite,
              title: movie.title,
              release_date: movie.release_date
            }))
          )
        );
        return forkJoin(movieObservables);
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
    const auth = getAuth(this.app);
    console.log('here');
    console.log(auth);
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


