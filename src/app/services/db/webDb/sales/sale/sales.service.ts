import { SaleItemsService } from "./../saleItems/saleItems.service";
import { Injectable } from "@angular/core";
import { SalesCrudService } from "./sales.crud";
import { SyncAPIService } from "../../sync.service";
import { SettingsService } from "../../../../global/settings.service";
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public salesCrudService: SalesCrudService,
    public saleItemsService: SaleItemsService,
    public syncAPIService: SyncAPIService,
    public setting: SettingsService,
    private http: HttpClient,
    public loadingCtrl: LoadingController
  ) {}

  getSalesByShiftNumber = async (shiftId, actionType) => {
    this.webDb = this.syncAPIService.webDb;
    let sId = String(shiftId).replace(/\s/g, "");
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM sales WHERE shiftId = ? AND actionType = ?",
            [sId, String(actionType)],
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

  getSaleID(shiftID){
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getNumerator?shiftId=" +
              shiftID
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("RES: ", res);
            resolve(res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  getSalesByShiftNumberForEnd = async (shiftId, actionType) => {
    this.webDb = this.syncAPIService.webDb;
    let sId = String(shiftId).replace(/\s/g, "");
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM sales WHERE shiftId = ? AND actionType = ?",
            [sId, String(actionType)],
            (tx, results) => {
              let arr = [...results.rows];
              resolve(arr);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  // "SELECT * FROM sales WHERE shiftId = ? AND actionType = ?",
  // [shiftId, actionType],

  getSalesByCustomerId = async (customerId) => {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getData?contact_id=" +
              customerId
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("RES: ", res);
            resolve(res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
    // try {
    //   return new Promise((resolve, reject) => {
    //     this.webDb.transaction((tx) => {
    //       tx.executeSql(
    //         "SELECT * FROM sales WHERE contact_id = ?",
    //         [customerId],
    //         (tx, results) => {
    //           resolve(results.rows);
    //           // console.log(results.rows);
    //         }
    //       );
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  getSalesByShiftNumberAndSendServer = (shiftId) => {
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM sales WHERE shiftId = ? AND sendToServer = ?",
            [shiftId, "false"],
            function (tx, results) {
              resolve(results.rows);
              // console.log(results.rows);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  insertSaleToDb = (item) => {
    console.log(item);
    this.webDb = this.syncAPIService.webDb;
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

  updateSendToServerToDb = (shiftId) => {
    this.webDb = this.syncAPIService.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "UPDATE sales SET sendToServer = ? WHERE shiftId = ?",
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

  getSales = async (shiftId) => {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getData?shiftId=" +
              shiftId
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            resolve(res);
            console.log("resServer: ", res);
          })
          .catch((err) => {
            resolve("err");
            console.log("error:", err);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  };
}
