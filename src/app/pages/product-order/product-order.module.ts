import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductOrderPageRoutingModule } from './product-order-routing.module';

import { ProductOrderPage } from './product-order.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductOrderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductOrderPage]
})
export class ProductOrderPageModule {}
