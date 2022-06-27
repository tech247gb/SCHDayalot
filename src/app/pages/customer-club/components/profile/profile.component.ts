import { DayalotService } from "./../../../../services/db/webDb/dayalot/dayalot.service";
import { customersService } from "./../../../../services/db/webDb/club/customers/customers.service";
import { customerModel } from "./../../../../models/customer.model";
import { Component, OnInit, Input } from "@angular/core";
import { UtilsService } from "../../../../services/utils/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // @Input() isEdit;
  isEdit = false;
  userObj: customerModel = new customerModel();
  currentCustomer: object = {};
  dayelet_name;
  Club_name = "לא נמצא מועדון קיים.";
  clubNamesArray: any;

  constructor(
    public customerService: customersService,
    public utils: UtilsService,
    public router: Router,
    public dayalotService: DayalotService
  ) {
    if (localStorage.currentCustomer) {
      this.userObj = JSON.parse(localStorage.currentCustomer);
      this.getDayeletName();
      // if (this.userObj.Club[0] == "2") {
      this.Club_name = "Guerlain";
    }
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.isEdit = false;
  }
  async getDayeletName() {
    let dayelet = await this.dayalotService.getDayeletByNumberOnly(
      this.userObj.dayelet_id
    );

    this.dayelet_name = dayelet["Nachn"] + " " + dayelet["Vorna"];
  }
  onSubmit() {
    if (this.userObj.FirstName.length < 2)
      this.utils.presentToast("אנא הכניסי שם פרטי");
    else if (this.userObj.LastName.length < 2)
      this.utils.presentToast("אנא הכניסי שם משפחה");
    else if (this.userObj.TelephoneNumber.length <= 8)
      this.utils.presentToast("אנא הכניסי מספר פלאפון תקין");
    else if (!this.userObj.Birthdate)
      this.utils.presentToast("אנא הכניסי תאריך לידה");
    else if (this.userObj.City.length < 3)
      this.utils.presentToast("אנא הכניסי שם של ישוב");

    this.customerService.updateCustomerToDb(this.userObj);
    this.utils.presentToast("לקוח עודכן בהצלחה!");
    localStorage.customerNum = Number(localStorage.customerNum) + 1;
    localStorage.currentCustomer = JSON.stringify(this.userObj);
    this.router.navigate(["/customer-club"]);

  }
}
