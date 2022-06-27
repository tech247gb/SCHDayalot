import { SaleItemsService } from "./../../../../services/db/webDb/sales/saleItems/saleItems.service";
import { SalesService } from "../../../../services/db/webDb/sales/sale/sales.service";
import { async } from "@angular/core/testing";
import { ShiftsReportsService } from "./../../../../services/db/webDb/shiftsReports/shiftsReports.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-one-shift",
  templateUrl: "./one-shift.component.html",
  styleUrls: ["./one-shift.component.scss"],
})
export class OneShiftComponent implements OnInit {
  @Input() oneShift;
  items = [];
  heightPercent = "50%";
  constructor(
    public shiftsReportsService: ShiftsReportsService,
    public saleItemsService: SaleItemsService,
    public salesService: SalesService
  ) {}

  ngOnInit() {
    //  console.log("oneShiftInit1", this.oneShift);
    this.oneShift.showDetails = false;
  }

  async showDetails() {
    let fullSales: any = await this.salesService.getSales(
      this.oneShift.shiftId
    );
    console.log("fullSales : ", fullSales);
    this.oneShift.sales = fullSales;
    // this.oneShift.sales = fullSales.filter((item) => {
    //   return item.actionType == 0;
    // });
    // this.oneShift.returns = fullSales.filter((item) => {
    //   return item.actionType == 1;
    // });
    this.oneShift.saleItems = [];
    this.oneShift.returnItems = [];

    // this.oneShift.sales.map(async (sale) => {
    //   let salesItems = await this.saleItemsService.getItemsBySaleNumber(
    //     sale.saleId
    //   );

    //   for (let index = 0; index < salesItems["rows"].length; index++) {
    //     this.oneShift.saleItems.push(salesItems["rows"].item(index));
    //   }
    // });

    // this.oneShift.returns.map(async (Return) => {
    //   let returnItems = await this.saleItemsService.getItemsBySaleNumber(
    //     Return.saleId
    //   );

    //   for (let index = 0; index < returnItems["rows"].length; index++) {
    //     this.oneShift.returnItems.push(returnItems["rows"].item(index));
    //   }
    // });
    this.oneShift.showDetails = !this.oneShift.showDetails;
  }
}
