import { IonicModule } from "@ionic/angular";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { FormsModule } from "@angular/forms";
import { SalesComponent } from "./sales/sales.component";

@NgModule({
  declarations: [ProfileComponent, SalesComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [],
  exports: [ProfileComponent, SalesComponent],
  entryComponents: []
})
export class ComponentsClubModule {}
