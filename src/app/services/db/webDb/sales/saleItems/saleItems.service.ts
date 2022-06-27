import { Injectable } from "@angular/core";
import { SaleItemsCrudService } from "./saleItems.crud";
import { SyncAPIService } from "../../sync.service";

@Injectable({
  providedIn: "root",
})
export class SaleItemsService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public saleItemsCrudService: SaleItemsCrudService,
    public syncAPIService: SyncAPIService
  ) {}

  getItemsBySaleNumber = async (saleId) => {
    this.webDb = this.syncAPIService.webDb;

    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM saleItems  WHERE saleId = ?",
            [saleId],
            (tx, results) => {
              resolve(results);
            },
            (err) => {
              console.log("ERR : ", err);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  getSalesByCustomerId = (customerId) => {
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM saleItems WHERE customerId = ?",
            [customerId],
            (tx, results) => {
              resolve(results.rows);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  getSalesByShiftNumberAndSendServer = (shiftId) => {
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM saleItems WHERE shiftId = ? AND sendToServer = ?",
            [shiftId, "false"],
            function (tx, results) {
              resolve(results.rows);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  insertSaleItemToDb = (item) => {
    console.log(item);
    this.webDb = this.syncAPIService.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "INSERT INTO saleItems (saleId, matnr, ean11, parallel, rowNum, maktxHe, price) VALUES (?,?,?,?,?,?,?)",
          [
            item["saleId"],
            item["matnr"],
            item["ean11"],
            item["parallel"],
            item["rowNum"],
            item["maktxHe"],
            item["price"],
          ],
          (t, results) => {
            resolve("success");
          },
          function (t, error) {
            console.log("Error insert: " + error.message);
          }
        );
      });
    });
  };

  updateSendToServerToDb = (shiftId) => {
    this.webDb = this.syncAPIService.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "UPDATE saleItems SET sendToServer = ? WHERE shiftId = ?",
          ["true", shiftId],
          (t, results) => {
            resolve("success");
          },
          function (t, error) {
            console.log("Error UPDATE: " + error.message);
          }
        );
      });
    });
  };
}
