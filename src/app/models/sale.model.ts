import { Moment } from "moment";
import { SaleItemModel } from "./saleItem.model";

export class SaleModel {
  saleId: String;
  shiftId: String;
  pernr: String;
  dayeletId: String;
  transactioncurrencyCode: string;
  accountNumber: string;
  // date: String;
  // time: string;

  dealDate: Moment;
  telephoneNumber: string;
  telephonePrefix: string;
  batteryStatus: Number;
  contact_id: string;
  actionType: string;
  statuscode: string;
  sendToServer: boolean;
  salesorderdetailList: Array<SaleItemModel>;
}
