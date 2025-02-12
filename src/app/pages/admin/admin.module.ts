import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AdminComponent } from "./admin.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: "", component: AdminComponent }])],
    declarations: [AdminComponent],
})
export class AdminModule { }
