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
    this.movieService.getFavorites(this.currentUserId).subscribe(
      (favorites) => {
        // Assuming getFavorites returns an array of movie IDs
        // We need to fetch the details for each movie
        this.favoriteMovies = []
        favorites.forEach((movieId: any) => {
          this.movieService.getMovieDetails(movieId).subscribe(
            (movieDetails) => {
              this.favoriteMovies.push(movieDetails)
            },
            (error) => {
              console.error("Error fetching movie details", error)
            },
          )
        })
      },
      (error) => {
        console.error("Error fetching favorites", error)
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
