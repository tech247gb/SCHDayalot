import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

let dayelet = localStorage.dayelet;
// Id = 10;
//redirectTo: dayelet ? "/home" : "/login",
const routes: Routes = [
  {
    path: "",
    redirectTo: dayelet ? "/home" : "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "product-info",
    loadChildren: () =>
      import("./pages/product-info/product-info.module").then(
        (m) => m.ProductInfoPageModule
      ),
  },
  {
    path: "product-order",
    loadChildren: () =>
      import("./pages/product-order/product-order.module").then(
        (m) => m.ProductOrderPageModule
      ),
  },
  {
    path: "shift/:id",
    loadChildren: () =>
      import("./pages/shift/shift.module").then((m) => m.EnterShiftPageModule),
  },
  {
    path: "add-member",
    loadChildren: () =>
      import("./pages/add-member/add-member.module").then(
        (m) => m.AddMemberPageModule
      ),
  },
  {
    path: "sale-without",
    loadChildren: () =>
      import("./pages/sale-without/sale-without.module").then(
        (m) => m.SaleWithoutPageModule
      ),
  },
  {
    path: "customer-club",
    loadChildren: () =>
      import("./pages/customer-club/customer-club.module").then(
        (m) => m.CustomerClubPageModule
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./pages/reports/reports.module").then((m) => m.ReportsPageModule),
  },
  {
    path: "shifts-reports",
    loadChildren: () =>
      import("./pages/shifts-reports/shifts-reports.module").then(
        (m) => m.ShiftsReportsPageModule
      ),
  },
  {
    path: "pidyon-reports",
    loadChildren: () =>
      import("./pages/pidyon-reports/pidyon-reports.module").then(
        (m) => m.PidyonReportsPageModule
      ),
  },
  {
    path: "customer-reports",
    loadChildren: () =>
      import("./pages/customer-reports/customer-reports.module").then(
        (m) => m.CustomerReportsPageModule
      ),
  },
  {
    path: "return",
    loadChildren: () =>
      import("./pages/return/return.module").then((m) => m.ReturnPageModule),
  },
  {
    path: 'product-info-number',
    loadChildren: () => import('./pages/product-info-number/product-info-number.module').then( m => m.ProductInfoNumberPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
