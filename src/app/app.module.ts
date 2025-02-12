import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire/compat"
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFireDatabaseModule } from "@angular/fire/compat/database"
import { AngularFireStorageModule } from "@angular/fire/compat/storage"
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { MatchingComponent } from './pages/matching/matching.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [AppComponent, MovieListComponent, LoginComponent,  MatchingComponent, AdminComponent, RegisterComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
