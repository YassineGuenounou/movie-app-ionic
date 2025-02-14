import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: false
})
export class MovieListComponent implements OnInit {
  isToastOpen = false;
  movies: any[] = []
  currentUserId!: string

  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadMovies()
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserId = user?.uid
    })
  }

  loadMovies() {
    this.movieService.getPopularMovies().subscribe(
      (response: any) => {
        this.movies = response.results
      },
      (error) => {
        console.error("Error fetching movies", error)
      },
    )
  }

  addToFavorites(movieId: number) {
   
      this.movieService
        .addToFavorites(movieId)
        .then(() => {
          console.log("Added to favorites");
          this.setOpen(true);
        })
        .catch((error) => console.error("Error adding to favorites", error))
    
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
