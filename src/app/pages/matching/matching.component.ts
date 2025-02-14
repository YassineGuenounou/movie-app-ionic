import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
  standalone: false,
})
export class MatchingComponent implements OnInit {

  matchingUsers!: any[] 

  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {        
        this.loadMatchingUsers(user.uid)
      }
    })
  }

  loadMatchingUsers(userId: string) {
    this.movieService.getMatchingUsers(userId).subscribe(
      (matches) => {        
        this.matchingUsers = matches
      },
      (error) => {
        console.error("Error fetching matching users", error)
      },
    )
  }

}
