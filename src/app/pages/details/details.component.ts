import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent implements OnInit {
  app = initializeApp(environment.firebaseConfig);
  user: any
  favoriteMovies: any[] = []
  auth = getAuth(this.app);


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly movieService: MovieService,
  ) { }

  ngOnInit() {
    const userId = this.auth.currentUser?.uid
    if (userId) {
      this.loadUserDetails(userId)
      this.loadFavoriteMovies(userId)
    }
  }

  loadUserDetails(userId: string) {
    this.user = this.auth.currentUser
  }

  loadFavoriteMovies(userId: string) {
    this.movieService.getFavoriteMovies(userId).subscribe(
      (movies) => {
        this.favoriteMovies = movies
      },
      (error) => {
        console.error("Error fetching favorite movies", error)
      },
    )
  }
  
  logout() {
    this.authService
      .logout()
      .then(() =>
        this.router.navigate(["/login"])
      )
      .catch((error) => {
        console.error("Error logging out", error)
      })
  }
}
