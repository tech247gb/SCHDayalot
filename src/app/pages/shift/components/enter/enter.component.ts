import { ShiftService } from "./../../shift.service";
import { UtilsService } from "./../../../../services/utils/utils.service";
import { ShiftsReportsService } from "./../../../../services/db/webDb/shiftsReports/shiftsReports.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-enter",
  templateUrl: "./enter.component.html",
  styleUrls: ["./enter.component.scss"],
})
export class EnterComponent implements OnInit {
  public customerDetails: any = {};
  public dayeletDetails: any = {};
  public isValid: boolean = true;
  constructor(
    public api: ApiService,
    public router: Router,
    public shiftsReportsService: ShiftsReportsService,
    public util: UtilsService,
    public shiftService: ShiftService
  ) {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerDetails = JSON.parse(localStorage.currentStorTemp);
    console.log(this.customerDetails);
  }

  ngOnInit() {
    console.log("Enter");
  }

  enterShift() {
    this.isValid = false;
    this.shiftService.enterShift();
  }
}
