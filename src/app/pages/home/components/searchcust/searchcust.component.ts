import { SimpleService } from "./../../../../services/global/autoCompleteService";
import { UtilsService } from "./../../../../services/utils/utils.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { customersService } from "../../../../services/db/webDb/club/customers/customers.service";
import { AutoCompleteModule } from "ionic4-auto-complete";

@Component({
  selector: "app-searchcust",
  templateUrl: "./searchcust.component.html",
  styleUrls: ["./searchcust.component.scss"],
})
export class SearchcustComponent implements OnInit {
  public userNumber;
  public currentCustomer;
  public customers: any;
  public showList = false;
  constructor(
    public customerService: customersService,
    public router: Router,
    public utils: UtilsService
  ) {
    this.getCustomeres();
  }

  ngOnInit() {}

  getCustomeresChange() {
    this.showList = true;
    this.getCustomeres();
  }

  async getCustomeres() {
    this.customers = await this.customerService.getCustomerByPhoneNumberLike(
      this.userNumber
    );

  }

  async getUser() {
    let customereExsist = await this.customerService.getCustomerByPhoneNumber(
      this.userNumber
    );
    localStorage.currentCustomer = JSON.stringify(customereExsist);

    if (customereExsist) {
      this.userNumber = "";
      this.router.navigate(["/customer-club"]);
    } else {
      this.utils.presentToast("לקוח לא קיים במערכת!");
    }
  }

  setCustomer(customer) {
    this.userNumber = customer.Contact_id;
    this.customers = [];
    this.getUser();
  }
}
