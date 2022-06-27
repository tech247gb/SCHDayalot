import { SaleItemsService } from "./../../../services/db/webDb/sales/saleItems/saleItems.service";
import { SalesService } from "../../../services/db/webDb/sales/sale/sales.service";
import { Component, OnInit } from "@angular/core";
import { saleHistory } from "../../../models/saleHistory.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"],
})
export class EditPage implements OnInit {
  sales;
  Item;
  saleItem = new saleHistory();
  saleItems: Array<saleHistory> = [];
  currentCustomer: object = {};
  constructor(
    public salesService: SalesService,
    public saleItemsService: SaleItemsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getSalesByCustomerId();
  }

  async getSalesByCustomerId() {
    this.saleItems = [];
    this.currentCustomer = JSON.parse(localStorage.currentCustomer);
    this.sales = await this.salesService.getSalesByCustomerId(
      this.currentCustomer["Contact_id"]
    );
    this.sales = [...this.sales];
    this.sales.map(async (sale) => {
      // let salesItems = await this.saleItemsService.getItemsBySaleNumber(
      // sale.salesorderdetailList
      // );

      for (let index = 0; index < sale.salesorderdetailList.length; index++) {
        this.Item = sale.salesorderdetailList[index];
        this.saleItem.saleId = sale.saleId;
        this.saleItem.date = sale.dealDate;
        this.saleItem.maktxHe = this.Item["maktxHe"];
        this.saleItems.push({ ...this.saleItem });
      }
    });
  }
}
