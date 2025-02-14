import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {

  email!: string
  password!: string
  name!: string
  surname!: string
  age!: number
  photoUrl!: string

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    })

    this.photoUrl = `data:image/jpeg;base64,${image.base64String}`
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password, this.name, this.surname, this.age, this.photoUrl)
      // Redirection vers la page de login après une inscription réussie
      this.router.navigate(['/login']); // Utilisez le chemin de votre route de login
      // Navigate to home page or show success message
    } catch (error) {
      console.error("Registration failed", error)
    }
  }

}
