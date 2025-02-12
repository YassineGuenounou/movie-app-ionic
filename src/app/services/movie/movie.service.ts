import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly apiKey = environment.firebaseConfig.apiKey
  private readonly apiUrl = environment.firebaseConfig.authDomain

  constructor(
    private readonly http: HttpClient,
    private readonly db: AngularFireDatabase,
  ) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`)
  }

  addToFavorites(userId: string, movieId: number): Promise<void> {
    return this.db.object(`favorites/${userId}/${movieId}`).set(true)
  }

  // getFavorites(userId: string): Observable<any> {
  //   return this.db
  //     .list(`favorites/${userId}`)
  //     .snapshotChanges()
  //     .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val()! }))))
  // }

  addMovie(movie: any): Promise<void> {
    return this.db.list("movies").push(movie)
  }

  getUsers(): Observable<any> {
    return this.db
      .list("users")
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val()! }))))
  }

  toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    return this.db.object(`users/${userId}`).update({ isActive })
  }

  getMatchingUsers(userId: string): Observable<any> {
    // This is a simplified version. You'll need to implement the actual matching logic.
    return this.db
      .list("favorites")
      .snapshotChanges()
      .pipe(
        map((changes) => {
          const allFavorites = changes.map((c) => ({ userId: c.key, favorites: c.payload.val() }))
          const userFavorites = allFavorites.find((f) => f.userId === userId)?.favorites || {}
          const userFavoriteCount = Object.keys(userFavorites).length

          return allFavorites
            .filter((f) => f.userId !== userId)
            .map((f) => {
              const matchingFavorites = Object.keys(f.favorites!).filter((movieId) => userFavorites[movieId])
              const matchPercentage = (matchingFavorites.length / userFavoriteCount) * 100
              return { userId: f.userId, matchPercentage }
            })
            .filter((match) => match.matchPercentage >= 75)
        }),
      )
  }

  getFavorites(userId: string): Observable<any> {
    return this.db
      .list(`favorites/${userId}`)
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => c.payload.key)))
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`)
  }

  removeFromFavorites(userId: string, movieId: number): Promise<void> {
    return this.db.object(`favorites/${userId}/${movieId}`).remove()
  }
}
