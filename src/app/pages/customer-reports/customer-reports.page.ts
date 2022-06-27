import { customersService } from "./../../services/db/webDb/club/customers/customers.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer-reports",
  templateUrl: "./customer-reports.page.html",
  styleUrls: ["./customer-reports.page.scss"],
})
export class CustomerReportsPage implements OnInit {
  customers;
  isLoad: Boolean = false;
  constructor(public CustomersService: customersService) {}

  ngOnInit() {
    this.getCustomer();
  }

  async getCustomer() {
    this.customers = await this.CustomersService.getCustomerByDayelet_id(
      Number(JSON.parse(localStorage.dayelet)["Perid"])
    );
    this.isLoad = true;
  }
}
