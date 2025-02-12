import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MatchingComponent } from "./matching.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: "", component: MatchingComponent }])],
    declarations: [MatchingComponent],
})
export class MatchingModule { }
