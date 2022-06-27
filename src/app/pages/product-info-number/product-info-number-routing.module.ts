import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductInfoNumberPage } from './product-info-number.page';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductInfoNumberPageRoutingModule {}
