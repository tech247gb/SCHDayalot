import { SaleItemsService } from "./../../../../services/db/webDb/sales/saleItems/saleItems.service";
import { UtilsService } from "./../../../../services/utils/utils.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { ShiftsReportsService } from "../../../../services/db/webDb/shiftsReports/shiftsReports.service";
import { ShiftService } from "../../shift.service";
import { SalesService } from "../../../../services/db/webDb/sales/sale/sales.service";

@Component({
  selector: "app-end-shift",
  templateUrl: "./end-shift.component.html",
  styleUrls: ["./end-shift.component.scss"],
})
export class EndShiftComponent implements OnInit {
  public customerDetails: any = {};
  saleAmount: number = 0;
  saleMemberAmount: number = 0;
  memberAmount;
  sales: any;
  saleItems = [];
  isGuerlain;
  public isValid: boolean = true;
  constructor(
    public shiftService: ShiftService,
    public saleItemsService: SaleItemsService,
    public salesService: SalesService
  ) {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerDetails = JSON.parse(localStorage.currentStorTemp);
    console.log(this.customerDetails);
  }

  async ngOnInit() {
    this.getAmounts();
    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
      console.log("Zauve2 : ", this.isGuerlain);
    }
  }
  async getAmounts() {
    // this.sales = await this.salesService.getSalesByShiftNumberForEnd(
    //   localStorage.shiftId,
    //   0
    // );
    this.sales = await this.salesService.getSales(
      localStorage.shiftId
    );
    console.log(this.sales);
    // calculateAmount() {
      this.saleAmount = 0;
      this.sales.map((sale) => {
        sale.salesorderdetailList.map((product) => {
          if (sale.actionType == "0") {
            this.saleAmount += Number(product.price);
            if (sale.contact_id) {
              this.saleMemberAmount += Number(product.price);
              
            }
          }
          if (sale.actionType == "1") {
            this.saleAmount -= Number(product.price);
          }
        });
      });
      this.saleAmount = Number(String(this.saleAmount).split(".")[0]);


    // }
    // this.sales = sales;

    // this.sales.map(async (sale) => {
    //   let salesItems = await this.saleItemsService.getItemsBySaleNumber(
    //     sale.saleId
    //   );

    //   for (let index = 0; index < salesItems["rows"].length; index++) {
    //     console.log(salesItems["rows"].item(index));
    //     // if(salesItems["rows"].item(index).actionType == "1"){
    //     this.saleAmount =
    //       this.saleAmount + Number(salesItems["rows"].item(index).price);
    //   }
    //     // this.saleItems.push(salesItems["rows"].item(index));
    //   // }
    // });

    // this.sales.map(async (sale) => {
    //   if (sale["contact_id"]) {
    //     let salesItems = await this.saleItemsService.getItemsBySaleNumber(
    //       sale.saleId
    //     );

    //     for (let index = 0; index < salesItems["rows"].length; index++) {
    //       console.log(salesItems["rows"].item(index).price);
    //       this.saleMemberAmount =
    //         this.saleMemberAmount +
    //         Number(salesItems["rows"].item(index).price);
    //       // this.saleItems.push(salesItems["rows"].item(index));
    //       console.log(this.saleAmount, this.saleMemberAmount);
    //     }
    //   }
    // });

    console.log(this.saleAmount, this.saleMemberAmount);
    this.memberAmount = localStorage.customerNum;
  }
  endShift() {
    this.isValid = false;
    this.shiftService.endShift();
  }
}
