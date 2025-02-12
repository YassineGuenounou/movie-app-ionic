import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () => import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () => import("./pages/register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "movie-list",
    loadChildren: () => import("./pages/movie-list/movie-list.module").then((m) => m.MovieListPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "favorites",
    loadChildren: () => import("./pages/favorites/favorites.module").then((m) => m.FavoritesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: () => import("./pages/admin/admin.module").then((m) => m.AdminPageModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "matching",
    loadChildren: () => import("./pages/matching/matching.module").then((m) => m.MatchingPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
