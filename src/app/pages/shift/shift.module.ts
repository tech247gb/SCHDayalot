import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EnterShiftPageRoutingModule } from "./shift-routing.module";

import { EnterShiftPage } from "./shift.page";
import { ComponentsModule } from "../../components/components.module";
import { EnterComponent } from "./components/enter/enter.component";
import { EndShiftComponent } from "./components/end-shift/end-shift.component";
import { ShiftWithoutBarcodeComponent } from "./components/shift-without-barcode/shift-without-barcode.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterShiftPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    EnterShiftPage,
    EnterComponent,
    EndShiftComponent,
    ShiftWithoutBarcodeComponent
  ]
})
export class EnterShiftPageModule {}
