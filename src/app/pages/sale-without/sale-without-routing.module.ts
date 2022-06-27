import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleWithoutPage } from './sale-without.page';

const routes: Routes = [
  {
    path: '',
    component: SaleWithoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleWithoutPageRoutingModule {}
