import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductInfoNumberPageRoutingModule } from "./product-info-number-routing.module";

import { ProductInfoNumberPage } from "./product-info-number.page";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductInfoNumberPageRoutingModule,

    ComponentsModule,
  ],
  declarations: [ProductInfoNumberPage],
})
export class ProductInfoNumberPageModule {}
