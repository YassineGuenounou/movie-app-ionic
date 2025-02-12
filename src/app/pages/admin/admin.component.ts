import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: false
})
export class AdminComponent implements OnInit {

  users: any[] = []
  newMovie: any = {}

  constructor(private readonly movieService: MovieService) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.movieService.getUsers().subscribe(
      (users) => {
        this.users = users
      },
      (error) => {
        console.error("Error fetching users", error)
      },
    )
  }

  toggleUserStatus(userId: string, isActive: boolean) {
    this.movieService
      .toggleUserStatus(userId, isActive)
      .then(() => console.log("User status updated"))
      .catch((error) => console.error("Error updating user status", error))
  }

  addMovie() {
    this.movieService
      .addMovie(this.newMovie)
      .then(() => {
        console.log("Movie added")
        this.newMovie = {}
      })
      .catch((error) => console.error("Error adding movie", error))
  }

}
