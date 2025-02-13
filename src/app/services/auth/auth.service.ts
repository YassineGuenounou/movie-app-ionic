import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = initializeApp(environment.firebaseConfig);

  constructor(
     private readonly http: HttpClient
  ) { }

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
    age: number,
    photoUrl: string,
  ): Promise<any> {
    const auth = getAuth(this.app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // add to DB

    this.http.put(`${environment.firebaseConfig.databaseURL}/users/${user.uid}.json`, {
      email,
      name,
      surname,
      age,
      photoUrl,
    }).subscribe((response) => {
      console.log(response);
    });
    

    return user;
  }
  

  login(email: string, password: string): Promise<any> {
    const auth = getAuth(this.app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    const auth = getAuth(this.app);
    return auth.signOut();
  }

  getCurrentUser(): Observable<any> {
    const auth = getAuth(this.app);
    
    return new Observable((observer) => {
      auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    });
  }
  getUser(userId: string): Observable<any> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/users/${userId}.json`);
    
  }
}
