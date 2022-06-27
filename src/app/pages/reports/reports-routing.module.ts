import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReportsPage } from "./reports.page";

const routes: Routes = [
  {
    path: "",
    component: ReportsPage
  }
  // {
  //   path: 'shifts',
  //   loadChildren: () => import('./shifts/shifts.module').then( m => m.ShiftsPageModule)
  // },
  // {
  //   path: 'shifts-reports',
  //   loadChildren: () => import('./shifts-reports/shifts-reports.module').then( m => m.ShiftsReportsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsPageRoutingModule {}
