import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private readonly isNavbarVisible = new BehaviorSubject<boolean>(true);
  isNavbarVisible$ = this.isNavbarVisible.asObservable();

  constructor() { }

  showNavbar() {
    this.isNavbarVisible.next(true);
  }

  hideNavbar() {
    this.isNavbarVisible.next(false);
  }
}
