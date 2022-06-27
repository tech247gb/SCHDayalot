import { SyncAPIService } from "./../../sync.service";
import { SaleItemsService } from "./../saleItems/saleItems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SalesCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;
  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.dropTable("", json);
    // this.createTable(json);
  }

  dropTable(tableName, json) {
    console.log("Salejson : ", json);
    this.webDb.transaction((t) => {
      t.executeSql("DROP TABLE IF EXISTS saleItems", []);
    });
    this.webDb.transaction((t) => {
      t.executeSql(
        "CREATE TABLE IF NOT EXISTS saleItems (saleId, matnr, ean11, parallel, rowNum, maktxHe, price)",
        []
      );
    });
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS sales",
        [],
        (t, results) => {
          this.createTable(json);
          console.log("created");
        },
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    });
  }

  createTable = (json) => {
    this.webDb.transaction((t) => {
      t.executeSql(
        "CREATE TABLE IF NOT EXISTS sales (saleId, shiftId, pernr, dealDate, contact_id, actionType, batteryStatus)",
        []
        // (t, results) => {
        //   json.map((item) => {
        //     this.insertSaleToDb(item);

        //     let itemlist = [...item["salesorderdetailList"]];
        //     this.insertOrderdetailList(itemlist);
        //   });
        //   this.setPreloader(1);
        // },

        // function (t, error) {
        //   console.error("Error: " + error.message);
        // }
      );
    });
  };

  insertSaleToDb = (item) => {
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "INSERT INTO sales (saleId, shiftId, pernr, dealDate, contact_id, actionType, batteryStatus) VALUES (?,?,?,?,?,?,?)",
          [
            item["saleId"],
            item["shiftId"],
            item["pernr"],
            item["dealDate"],
            item["contact_id"],
            item["actionType"],
            item["batteryStatus"],
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

  insertOrderdetailList(orderDetailList) {
    orderDetailList.map((item) => {
      // console.log(item);
      // this.webDb = this.syncAPIService.webDb;
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
    });
  }
}
