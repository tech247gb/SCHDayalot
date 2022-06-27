import { UtilsService } from "./../../../../services/utils/utils.service";
import { ApiService } from "./../../../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { ShiftService } from "../../shift.service";

@Component({
  selector: "app-shift-without-barcode",
  templateUrl: "./shift-without-barcode.component.html",
  styleUrls: ["./shift-without-barcode.component.scss"]
})
export class ShiftWithoutBarcodeComponent implements OnInit {
  codePortal = 167507;
  dayCodeArray: any;
  d = new Date();
  currentday = 0;
  currentDayCode = 0;

  constructor(
    public api: ApiService,
    public util: UtilsService,
    public shiftService: ShiftService
  ) {
    this.api.dayCode.subscribe(value => {
      this.dayCodeArray = value;
      console.log("dayCodeArray:", value);
    });

    this.currentday = this.d.getDate();
    this.currentDayCode = this.dayCodeArray[this.currentday - 1];

    console.log(this.currentday, this.currentDayCode, this.dayCodeArray);
  }

  ngOnInit() {}

  onSubnit() {
    if (this.codePortal == this.currentDayCode["code"]) {
      this.shiftService.endShift();
    } else {
      this.util.presentToast("מצטערת! הקוד לא תקין.");
    }
  }
}
