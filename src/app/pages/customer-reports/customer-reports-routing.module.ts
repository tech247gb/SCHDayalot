import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerReportsPage } from './customer-reports.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerReportsPageRoutingModule {}
