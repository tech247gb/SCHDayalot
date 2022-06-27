import { SaleItemsService } from "./../../services/db/webDb/sales/saleItems/saleItems.service";
import { async } from "@angular/core/testing";
import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { ShiftsReportsService } from "../../services/db/webDb/shiftsReports/shiftsReports.service";
import { SalesService } from "../../services/db/webDb/sales/sale/sales.service";
import { customersService } from "../../services/db/webDb/club/customers/customers.service";
import { LoadingController, IonContent } from "@ionic/angular";

@Component({
  selector: "app-shifts-reports",
  templateUrl: "./shifts-reports.page.html",
  styleUrls: ["./shifts-reports.page.scss"],
})
export class ShiftsReportsPage implements OnInit {
  shifts: any = [];
  isLoad: boolean = false;
 

  constructor(
    public shiftsReports: ShiftsReportsService,
    public salesService: SalesService,
    public saleItemsService: SaleItemsService,
    public customers: customersService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getShifts();
    console.log("get shifts enter");
  }

  async getShifts() {
    let mainLoader = await this.loadingCtrl.create({ message: "...בטעינה" });
    mainLoader.present();
    console.log("SHIFTS0");
    this.shifts = await this.shiftsReports.getShiftsReportsByNumber();
    this.shifts = [...this.shifts];
    this.isLoad = true;
    console.log("SHIFTS1");
    // this.shifts.map(async (shift) => {
    //   console.log("SHIFTS2_1");
    //   shift["sales"] = await this.salesService.getSalesByShiftNumber(
    //     shift.shiftId,
    //     0
    //   );
    //   console.log("SHIFTS2_2");
    //   if (!shift["sales"]) {
    //     shift["sales"] = [];
    //   } else {
    //     shift["sales"] = [...shift["sales"]];
    //   }

    //   shift["returns"] = await this.salesService.getSalesByShiftNumber(
    //     shift.shiftId,
    //     1
    //   );
    //   console.log("SHIFTS2_3");
    //   console.log("Returns : ", shift["returns"]);
    //   if (!shift["returns"]) {
    //     shift["returns"] = [];
    //   } else {
    //     shift["returns"] = [...shift["returns"]];
    //   }
    //   console.log("SHIFTS2_4");
    //   shift["customers"] = await this.customers.getCustomerByShiftId(
    //     shift.shiftId
    //   );
    //   console.log("SHIFTS2_5");
    //   if (!shift["customers"]) {
    //     shift["customers"] = [];
    //   } else {
    //     shift["customers"] = [...shift["customers"]];
    //   }
    // });

    mainLoader.dismiss();
  }

}
