import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReturnPageRoutingModule } from "./return-routing.module";

import { ReturnPage } from "./return.page";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReturnPage]
})
export class ReturnPageModule {}
