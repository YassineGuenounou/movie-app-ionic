import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NavbarService } from 'src/app/services/nav-bar/navbar.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: false
})
export class TabsComponent implements OnInit {
  isNavbarVisible$: Observable<boolean>;

  constructor(private readonly tabs: IonTabs, private readonly navbarService: NavbarService) {
    this.isNavbarVisible$ = this.navbarService.isNavbarVisible$;

  }

  ngOnInit() {
    // this.tabs.select(undefined!); // Masque les onglets
  }




}
