import { UtilsService } from "./../../services/utils/utils.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { GlobalFnService } from "../../services/global/globalFn.service";

@Component({
  selector: "app-user-header",
  templateUrl: "./user-header.component.html",
  styleUrls: ["./user-header.component.scss"],
})
export class UserHeaderComponent implements OnInit {
  public userDetails: any = {};
  public inShift: boolean;
  public currentStor: object = {};
  timer: any;
  clickCounter = 0;
  public isNotCordova = false;
  public isNetework = true;

  constructor(
    public api: ApiService,
    public router: Router,
    public globalFn: GlobalFnService,
    public util: UtilsService
  ) {
    this.api.inShiftB.subscribe((value) => {
      this.inShift = Boolean(value);
      
      this.getUserDetails();
    });

    this.api.userConnect.subscribe(() => {
      this.getUserDetails();
    });

    this.getUserDetails();
  }

  getUserDetails() {
    if (localStorage.dayelet)
      this.userDetails = JSON.parse(localStorage.dayelet);
    // this.userDetails = this.api.userDetails;
    this.userDetails.Pernr = this.globalFn.cutZero(this.userDetails.Pernr);
    if (localStorage.currentStor && localStorage.currentStor != "")
      this.currentStor = JSON.parse(localStorage.currentStor);
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUserDetails();
    this.api.inShiftB.subscribe((value) => {
      this.inShift = Boolean(value);
      this.getUserDetails();
    });
  }
  ionViewWillEnter() {
    this.api.inShiftB.subscribe((value) => {
      this.inShift = Boolean(value);
      this.getUserDetails();
    });
  }

  async goEnterOut() {
    this.clickCounter++;
    this.timer = setTimeout(() => {
      if (this.clickCounter > 1) this.doubleClick();
      else this.router.navigate(["/shift", 0]);
      this.clickCounter = 0;
    }, 200);
  }

  doubleClick() {
    clearTimeout(this.timer);
     if (this.inShift) {
      this.router.navigate(["/shift", 1]);
    } else {
      this.util.presentToast("מצטערת! באמצעות קוד פורטל ניתן רק לסיים משמרת.");
    }
  }
}
