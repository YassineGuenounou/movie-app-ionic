import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FavoritesComponent } from "./favorites.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: "", component: FavoritesComponent }])],
    declarations: [FavoritesComponent],
})
export class FavoritesModule { }
