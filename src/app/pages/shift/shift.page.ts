import { ShiftService } from "./shift.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "./../../services/utils/utils.service";
import { Platform } from "@ionic/angular";

import { Component, OnInit } from "@angular/core";

import { ApiService } from "../../services/api.service";
import { StorsService } from "../../services/db/webDb/stors/stors.service";
import { BarcodeService } from "../../services/global/barcode.service";

@Component({
  selector: "app-shift",
  templateUrl: "./shift.page.html",
  styleUrls: ["./shift.page.scss"],
})
export class EnterShiftPage implements OnInit {
  customerId: string = "921353";
  showDetails: number = 0;
  public inShift: boolean;
  id: number;

  constructor(
    public platform: Platform,
    public api: ApiService,
    public storsService: StorsService,
    public utils: UtilsService,
    public router: Router,
    private route: ActivatedRoute,
    public barcodeService: BarcodeService,
    public shiftService: ShiftService
  ) {
    this.route.params.subscribe((params) => {
      // 0 - with barcode  1 - without barcode
      this.id = +params["id"]; // (+) converts string 'id' to a number
    });

    this.api.inShiftB.subscribe((value) => {
      this.inShift = Boolean(value);
    });
  }

  ionViewDidEnter() {
    if (this.id == 0) {
      this.openBarCode();
    } else {
      // without barcode
      this.showDetails = 4;
    }
  }

  ngOnInit() {
    console.log("DidInit");
  }

  openBarCode() {
   
    if (!this.platform.is("cordova")) {
      this.getCustomerDetails(this.customerId);
    } else {
      localStorage.isBarcode = true;
      this.barcodeService.scanBarcode(this.getCustomerDetails);
    }
  }

  getCustomerDetails = async (storId) => {
    let res = false;

    let storResult: any = await this.storsService.getStorByNumber(storId);
    if (storResult) {
      if (
        !localStorage.currentStor ||
        storId == JSON.parse(localStorage.currentStor)["Kunnr"]
      ) {
        localStorage.currentStorTemp = JSON.stringify(storResult);
        res = true;
      } else if (storId != JSON.parse(localStorage.currentStor)["Kunnr"]) {
        this.utils.presentalertConfirm(
          " לא ניתן לסיים משמרת מחנות שונה מפתיחת המשמרת הנוכחית"
        );
        this.router.navigate(["/home"]);
      }
    } else if (res == false && !storResult) {
      this.utils.presentToast("חנות לא קיימת! אנא סרקי שוב");
      console.log("home!!");
      this.router.navigate(["/home"]);
    }

    //1-start shift 2-end shift 3-store not invalid
    if ((res && !this.inShift) || !this.inShift) {
      this.showDetails = 1;
    } else if (res && this.inShift) {
      this.showDetails = 2;
    } else {
      this.showDetails = 3;
    }

    console.log("Shift2 : ", this.inShift, this.showDetails);
  };
}
