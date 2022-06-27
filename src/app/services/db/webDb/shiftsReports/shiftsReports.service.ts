import { Injectable } from "@angular/core";
import { ShiftsReportsCrudService } from "./shiftsReports.crud";
import { LoadingController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "../../../global/settings.service";

@Injectable({
  providedIn: "root",
})
export class ShiftsReportsService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public ShiftsReportsCrud: ShiftsReportsCrudService,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public setting: SettingsService
  ) {}

  getShiftsReportsByShiftId = (shiftId) => {
    this.webDb = this.ShiftsReportsCrud.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM shiftsReports WHERE shiftId = ?",
            [shiftId],
            function (tx, results) {
              console.log("results: ", results.rows);
              let r = [...results.rows];
              resolve(r);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  getShiftStatus(Pernr) {
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getShiftStatus?pernr=" +
              Pernr
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
    }
  }
  getShiftsReportsByNumber = async () => {
    // this.webDb = this.ShiftsReportsCrud.webDb;
    let Pernr = JSON.parse(localStorage.dayelet)["Pernr"];
    // try {
    //   return new Promise((resolve, reject) => {
    //     this.webDb.transaction(function (tx) {
    //       tx.executeSql(
    //         "SELECT * FROM shiftsReports WHERE Pernr = ?",
    //         [Pernr],
    //         function (tx, results) {
    //           console.log("results: ", results.rows);
    //           resolve(results.rows);
    //         }
    //       );
    //     });
    //     console.log("getShiftsReportsByNumber : ", Pernr);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getShifts?dayelet=" +
              Pernr
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

  InsertShiftsReportsToDb = (item) => {
    this.webDb = this.ShiftsReportsCrud.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "INSERT INTO shiftsReports (pernr, vorna, nachn, kunnr, kunnrName, date, enterTime, customerNum, shiftId, batteryStatus) VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            item["pernr"],
            item["vorna"],
            item["nachn"],
            item["kunnr"],
            item["kunnrName"],
            item["date"],
            item["enterTime"],
            item["customerNum"],
            item["shiftId"],
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

  updatetExitShiftsReportsToDb = (shift) => {
    this.webDb = this.ShiftsReportsCrud.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "UPDATE shiftsReports SET exitTime = (?), customerNum = (?) WHERE shiftId = ?",
          [shift["exitTime"], shift["customerNum"], shift["shiftId"]],
          (t, results) => {
            resolve("success");
            console.log(
              "updatetExitShiftsReportsToDb: ",
              JSON.stringify(shift)
            );
          },
          function (t, error) {
            console.log("Error UPDATE: " + error.message);
          }
        );
      });
    });
  };
}
