import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShiftsReportsPage } from './shifts-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftsReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftsReportsPageRoutingModule {}
