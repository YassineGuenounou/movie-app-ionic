import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Favorite } from 'src/app/services/movie/Favorites';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false,
})
export class FavoritesComponent implements OnInit {

  favoriteMovies!: Favorite[] 
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
      (response: Favorite[]) => {
        this.favoriteMovies = response
      },
      (error) => {
        console.error("Error fetching favorites", error)
      },
    )
    
  }

  removeFromFavorites(movieId: number) {
    this.movieService
      .removeFromFavorites(this.currentUserId, movieId)
      .subscribe((res) => {
        this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.id !== movieId.toString())
        window.location.reload()
      })
  }

}
