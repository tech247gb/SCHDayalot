import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomerClubPage } from "./customer-club.page";

const routes: Routes = [
  {
    path: "",
    component: CustomerClubPage,
    children: [
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./profile/profile.module").then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: "edit",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./edit/edit.module").then(m => m.EditPageModule)
          }
        ]
      },
      {
        path: "sale",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./sale/sale.module").then(m => m.SalePageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/customer-club/sale",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/customer-club/sale",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerClubPageRoutingModule {}
