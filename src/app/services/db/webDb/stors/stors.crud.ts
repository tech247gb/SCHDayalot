import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorsCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;
  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    console.log("StorsCrudService : ", webDb);
    this.webDb = webDb;
    this.items = json;
    this.dropTable("stors");
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS stors",
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
        "CREATE TABLE IF NOT EXISTS stors (Kunnr, Name1, Ort01, Street, HouseNum1)",
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
      "INSERT INTO stors (Kunnr, Name1, Ort01, Street, HouseNum1) VALUES (?,?,?,?,?)",
      [
        item["Kunnr"],
        item["Name1"],
        item["Ort01"],
        item["Street"],
        item["HouseNum1"],
      
      ],
      (t, results) => {},
      function (t, error) {
        console.error("Error: " + error.message);
      }
    );
  }
}
