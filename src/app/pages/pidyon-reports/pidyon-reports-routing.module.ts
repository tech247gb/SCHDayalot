import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PidyonReportsPage } from './pidyon-reports.page';

const routes: Routes = [
  {
    path: '',
    component: PidyonReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PidyonReportsPageRoutingModule {}
