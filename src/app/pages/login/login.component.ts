import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { NavbarService } from 'src/app/services/nav-bar/navbar.service';

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
    // private readonly navbarService: NavbarService,
    private readonly toastController: ToastController // Injectez ToastController
  ) { }


  ngOnInit() {
    // this.navbarService.hideNavbar(); // Masque la barre de navigation
  }

  ionViewWillLeave() {
    // this.navbarService.showNavbar(); // Affiche la barre de navigation en quittant la page
  }

  async login() {
    if (!this.email || !this.password) {
      const toast = await this.toastController.create({
        message: 'Veuillez remplir tous les champs.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/movie-list']);
    } catch (error) {
      console.error('Login failed', error);
      const toast = await this.toastController.create({
        message: 'Échec de la connexion. Veuillez vérifier vos identifiants.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToRegister() {
    this.router.navigate(["/register"])
  }

}
