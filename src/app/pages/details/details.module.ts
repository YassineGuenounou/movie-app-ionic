import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DetailsComponent } from "./details.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: "", component: DetailsComponent }])],
    declarations: [DetailsComponent],
})
export class DetailsModule { }
