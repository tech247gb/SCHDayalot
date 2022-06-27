import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportsPageRoutingModule } from "./reports-routing.module";

import { ReportsPage } from "./reports.page";
import { ComponentsModule } from "../../components/components.module";
import { ButtonsComponent } from "./components/buttons/buttons.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportsPage, ButtonsComponent]
})
export class ReportsPageModule {}
