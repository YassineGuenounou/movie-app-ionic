import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

 import { AngularFireModule } from "@angular/fire/compat"

import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './components/tabs/tabs.component';


@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), IonTabs],
  bootstrap: [AppComponent],
})
export class AppModule { }
