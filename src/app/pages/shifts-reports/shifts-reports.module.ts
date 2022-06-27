import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ShiftsReportsPageRoutingModule } from "./shifts-reports-routing.module";

import { ShiftsReportsPage } from "./shifts-reports.page";
import { ComponentsModule } from "../../components/components.module";
import { ShiftsListComponent } from "./component/shifts-list/shifts-list.component";
import { OneShiftComponent } from "./component/one-shift/one-shift.component";
import { ReportDetailsComponent } from "./component/one-shift/report-details/report-details.component";
import { ProductComponent } from "../../components/product/product.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftsReportsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    ShiftsReportsPage,
    ShiftsListComponent,
    OneShiftComponent,
    ReportDetailsComponent,
  ],
})
export class ShiftsReportsPageModule {}
