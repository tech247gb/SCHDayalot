import { SaleItemModel } from "./../../models/saleItem.model";
import { SaleModel } from "./../../models/sale.model";
import { NetworkService } from "./../server/network.service";
import { SalesService } from "../db/webDb/sales/sale/sales.service";
import { Injectable } from "@angular/core";
import { formatDate } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../services/utils/utils.service";
import { SalesServer } from "../server/saleServer";
import { SaleItemsService } from "../db/webDb/sales/saleItems/saleItems.service";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class SalesFunctionsService {
  public dayeletDetails: any = {};
  public storDetails: any = {};
  public customerDetails: any = {};
  public item: SaleItemModel = new SaleItemModel();
  public salesProduct = new SaleModel();
  public sale: SaleModel = new SaleModel();

  constructor(
    public router: Router,
    public util: UtilsService,
    public api: ApiService,
    public saleService: SalesService,
    public SaleItemsService: SaleItemsService,
    public salesServer: SalesServer,
    public network: NetworkService
  ) {}

  async saleToDb(products, actionType, customerId?) {
    return new Promise(async (resolve, reject) => {
      console.log("saleToDB");
      if (!customerId) customerId = "";
      //let saleNum = await this.saleService.getSaleID(localStorage.shiftId);

      this.salesProduct = this.convertArray(
        products,
        actionType,
        customerId,
        localStorage.shiftId+'_'+localStorage.saleNum
      );

      let serverAnswer;
      serverAnswer = await this.salesServer.sendSaleToServer(this.sale);
      console.log("serverAnswer:", serverAnswer);
      if (serverAnswer) this.sale.sendToServer = true;
      this.saleService.insertSaleToDb(this.sale);

      let i = 0;
      this.sale.salesorderdetailList.map(async (item) => {
        await this.SaleItemsService.insertSaleItemToDb(item);
        i++;
      });
      localStorage.saleNum = Number(localStorage.saleNum) + 1;

      console.log(JSON.stringify(this.sale));
      if (actionType != 1) {
        this.util.presentToast("כל הכבוד לך! אחלה של מכירה.");
      } else {
        this.util.presentToast("דיילת אמינה! אפילו החזרה עושה.");
      }
      if (customerId == "") {
        this.router.navigate(["/home"]);
      } else {
      }
      resolve("");
    });
  }

  convertArray(products, actionType, customerId, saleNum) {
    this.dayeletDetails = JSON.parse(localStorage.dayelet);
    this.storDetails = JSON.parse(localStorage.currentStor);
    this.sale.saleId = saleNum;
    this.sale.shiftId = localStorage.shiftId;
    this.sale.pernr = this.dayeletDetails.Pernr;
    this.sale.transactioncurrencyCode = "ILS";
    this.sale.accountNumber = this.storDetails.Kunnr;
    this.sale.statuscode = "1";

    this.sale.dealDate = moment(new Date()).utc(true)
    
    this.sale.telephoneNumber = String(customerId).slice(3);
    this.sale.telephonePrefix = String(customerId).slice(0, 3);
    this.sale.dayeletId = this.dayeletDetails.Perid;
    // this.sale.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    // this.sale.time = formatDate(new Date(), "HH:mm", "en");
    // if (actionType != 1) this.sale.saleNum = Number(localStorage.saleNum);
    // this.sale.shiftId = localStorage.shiftId;
    this.sale.contact_id = customerId;
    this.sale.actionType = String(actionType);
    this.sale.batteryStatus = this.api.BatteryStatus
      ? this.api.BatteryStatus.level
      : 1;

    this.sale.salesorderdetailList = new Array();
    for (let index = 0; index < products.length; index++) {
      this.item.saleId = saleNum;
      this.item.matnr = products[index].Matnr;
      this.item.ean11 = products[index].Ean11;
      this.item.mvgr1 = products[index].Mvgr1;
      this.item.parallel = products[index].parallel;
      this.item.rowNum = index + 1;
      this.item.maktxHe = products[index].MaktxHe;
      this.item.price = Number(products[index].Price);
      this.sale.salesorderdetailList.push({ ...this.item });
    }
    console.log(this.sale);
    return this.sale;
  }
}
