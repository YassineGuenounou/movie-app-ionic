import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly db: AngularFireDatabase,
  ) { }

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
    age: number,
    photoUrl: string,
  ): Promise<void> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password)
    await this.db.object(`users/${credential.user!.uid}`).set({
      name,
      surname,
      age,
      photoUrl,
      isActive: true,
      isAdmin: false,
    })
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  logout(): Promise<void> {
    return this.afAuth.signOut()
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState
  }
}
