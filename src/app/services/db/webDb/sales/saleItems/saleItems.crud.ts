import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SaleItemsCrudService {
  public webDb: any;
  public setPreloader: Function;
  public items: Array<object> = [];

  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.dropTable("");
    //this.createTable();
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS saleItems",
        [],
        (t, results) => {
          this.createTable();
        },
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    });
  }

  createTable = () => {
    this.webDb.transaction((t) => {
      t.executeSql(
        "CREATE TABLE IF NOT EXISTS saleItems (saleId, matnr, ean11, parallel, rowNum, maktxHe, price)",
        [],
        (t, results) => {
          this.setPreloader(1);
          // this.insertArrayRowToDb();
        },
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    });
  };
}
