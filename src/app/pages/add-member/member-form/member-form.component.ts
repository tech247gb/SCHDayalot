import { CitiesService } from "./../../../services/db/webDb/cities/cities.service";
import { formatDate } from "@angular/common";
import { Router } from "@angular/router";
import { customersService } from "./../../../services/db/webDb/club/customers/customers.service";
import { UtilsService } from "./../../../services/utils/utils.service";
import { CompanyService } from "./../../../services/db/webDb/club/company/company.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { customerModel } from "../../../models/customer.model";
import { clubModel } from "../../../models/club.model";
import { StorsService } from "../../../services/db/webDb/stors/stors.service";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.scss"],
})
export class MemberFormComponent implements OnInit {
  userObj: customerModel = new customerModel();
  clubNamesArray: any;
  public showList = false;
  public cities;
  public stors;
  public inShift;
  Contact_id: number;
  constructor(
    public companyService: CompanyService,
    public customerService: customersService,
    public citiesService: CitiesService,
    public storService: StorsService,
    public utils: UtilsService,
    public router: Router,
    public api: ApiService
  ) {
    this.getClubsName();
  }

  async getClubsName() {
    let club = await this.companyService.getComanys();
    this.clubNamesArray = this.utils.getArrayFromJson(club["rows"]);
    this.clubNamesArray.map((item) => {
      item["selected"] = true;
      return item;
    });
  }

  ngOnInit() {
    this.api.inShiftB.subscribe((value) => {
      this.inShift = value;
    });
  }

  getCityChange() {
    this.showList = true;
    this.getCities();
  }

  getStorChange() {
    this.showList = true;
    this.getStors();
  }
  async getCities() {
    if (this.userObj.City.length >= 2)
      this.cities = await this.citiesService.getCityByNameLike(
        this.userObj.City
      );
  }

  async getStors() {
    if (String(this.userObj.customerClub.AccountNumber).length >= 2)
      this.stors = await this.storService.getStorsByNameLike(
        this.userObj.customerClub.AccountNumber
      );
  }
  setCity(name) {
    this.userObj.City = name.CityName;
    this.cities = [];
  }

  setStor(name) {
    this.userObj.customerClub.AccountNumber = name.Kunnr;
    this.stors = [];
  }
  async onSubmit() {
    this.userObj.Contact_id = "0" + String(this.Contact_id);

    if (this.userObj.FirstName.length < 2)
      this.utils.presentToast("אנא הכניסי שם פרטי");
    else if (this.userObj.LastName.length < 2)
      this.utils.presentToast("אנא הכניסי שם משפחה");
    else if (
      this.userObj.Contact_id.length <= 8 ||
      this.userObj.Contact_id.charAt(1) != "5"
    )
      this.utils.presentToast("אנא הכניסי מספר סלולרי תקין");
    else if (!this.userObj.Birthdate)
      this.utils.presentToast("אנא הכניסי תאריך לידה");
    else if (
      (await this.citiesService.checkIfExsistCity(this.userObj.City)) == false
    )
      this.utils.presentToast("אנא הכניסי שם יישוב תקין");
    // else if (!this.userObj.club)
    //   this.utils.presentToast("אנא בחרי מועדון לקוחות");
    else {
      let phoneExsist = await this.customerService.MembershipbyPhone(
        this.userObj
      );

      console.log("EXSIST : ", phoneExsist);
      if (phoneExsist == false) {
        // this.userObj.Club = [];
        // this.clubNamesArray.map((item) => {
        //   if (item["selected"]) this.userObj.Club.push(item["Id"]);
        // });
        this.userObj.Club = [{ Id: "2" }];
        if (localStorage.dayelet) {
          let dayelet_id = Number(JSON.parse(localStorage.dayelet)["Perid"]);

          this.userObj.dayelet_id = dayelet_id;
        }
        if (localStorage.dayelet) {
          this.userObj.Supervisor_id = Number(
            JSON.parse(localStorage.dayelet)["Super"]
          );
        }
        if (localStorage.currentStor) {
          this.userObj.customerClub.AccountNumber = Number(
            JSON.parse(localStorage.currentStor)["Kunnr"]
          );
        }
        this.userObj.ShiftId = localStorage.shiftId;
        this.userObj.customerClub.JoiningDate = formatDate(
          new Date(),
          "yyy-MM-dd",
          "en"
        );
        this.userObj.Contact_id = this.userObj.Contact_id;
        this.userObj.TelephonePrefix = this.userObj.Contact_id.slice(0, 3);
        this.userObj.TelephoneNumber = this.userObj.Contact_id.slice(3);

        console.log(JSON.stringify(this.userObj));
        this.customerService.insertCustomerToDb(this.userObj);
        this.utils.presentToast("לקוח נוסף בהצלחה!");
        console.log(this.userObj);
        localStorage.customerNum = Number(localStorage.customerNum) + 1;
        localStorage.currentCustomer = JSON.stringify(this.userObj);
        this.router.navigate(["/customer-club"]);
      } else {
        this.utils.presentToast("לקוח קיים במועדון לקוחות זה!");
      }
    }
    console.log(this.userObj);
  }
}
