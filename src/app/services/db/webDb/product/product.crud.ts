import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductsCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;

  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.items = json;
    this.dropTable("products");
    // this.createTable();
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS products",
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
        "CREATE TABLE IF NOT EXISTS products (Matnr, MaktxHe, MaktxEn, Price,  Ean11, Mvgr1)",
        [],
        (t, results) => {
          this.insertArrayRowToDb();
        },
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    });
  };

  insertArrayRowToDb = () => {
    let i = 0;
    this.webDb.transaction((t) => {
      this.items.map((item) => {
        this.insertArrayToDb(item, t);
        i++;
        if (i == this.items.length) {
          console.log("CloseDB");
          this.setPreloader(1);
        }
      });
    });
  };

  insertArrayToDb(item, t) {
    t.executeSql(
      "INSERT INTO products (Matnr, MaktxHe, MaktxEn, Price,  Ean11,   Mvgr1) VALUES (?,?,?,?,?,?)",
      [
        item["Matnr"],
        item["MaktxHe"],
        item["MaktxEn"],
        item["Price"],
        item["Ean11"],
        item["Mvgr1"],
      
      ],
      (t, results) => {},
      function (t, error) {
        console.error("Error: " + error.message);
      }
    );
  }
}
