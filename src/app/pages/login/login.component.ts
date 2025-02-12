import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  email!: string
  password!: string

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  async login() {
    try {
      await this.authService.login(this.email, this.password)
      this.router.navigate(["/movie-list"])
    } catch (error) {
      console.error("Login failed", error)
      // Here you should show an error message to the user
    }
  }

  goToRegister() {
    this.router.navigate(["/register"])
  }

}
