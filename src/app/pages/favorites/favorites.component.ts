import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false,
})
export class FavoritesComponent implements OnInit {

  favoriteMovies: any[] = []
  currentUserId!: string

  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUserId = user.uid
        this.loadFavorites()
      }
    })
  }

  loadFavorites() {
    this.movieService.getFavoriteMovies(this.currentUserId).subscribe(
      (movies) => {
        this.favoriteMovies = movies
      },
      (error) => {
        console.error("Error fetching favorite movies", error)
      },
    )
  }

  removeFromFavorites(movieId: number) {
    this.movieService
      .removeFromFavorites(this.currentUserId, movieId)
      .then(() => {
        this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.id !== movieId)
      })
      .catch((error) => {
        console.error("Error removing from favorites", error)
      })
  }

}
