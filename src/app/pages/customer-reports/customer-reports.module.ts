import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CustomerReportsPageRoutingModule } from "./customer-reports-routing.module";

import { CustomerReportsPage } from "./customer-reports.page";
import { ComponentsModule } from "../../components/components.module";
import { CustomerLineComponent } from './customer-line/customer-line.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerReportsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CustomerReportsPage, CustomerLineComponent],
})
export class CustomerReportsPageModule {}
