// import { ShiftsReportsService } from "./shiftsReports.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShiftsReportsCrudService {
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
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS shiftsReports",
        [],
        (t, results) => {
          // this.createTable(json);
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
        "CREATE TABLE IF NOT EXISTS shiftsReports (pernr, vorna, nachn, kunnr, kunnrName, date, enterTime, exitTime, customerNum, shiftId, batteryStatus)",
        [],
        (t, results) => {
          json.map((item) => {
            this.InsertShiftsReportsToDb(item);
          });
          this.setPreloader(1);
        },
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    });
  };

  InsertShiftsReportsToDb = (item) => {
    return new Promise((resolve, reject) => {
      this.webDb.transaction(function (t) {
        t.executeSql(
          "INSERT INTO shiftsReports (pernr, vorna, nachn, kunnr, kunnrName, date, enterTime, exitTime, customerNum, shiftId, batteryStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [
            item["pernr"],
            item["vorna"],
            item["nachn"],
            item["kunnr"],
            item["kunnrName"],
            item["date"],
            item["enterTime"],
            item["exitTime"],
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
}
