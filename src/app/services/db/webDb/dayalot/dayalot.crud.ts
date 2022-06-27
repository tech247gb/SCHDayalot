import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DayalotCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;
  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.items = json;
    console.log(this.items);
    this.dropTable("dayalot");
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS dayalot",
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
        "CREATE TABLE IF NOT EXISTS dayalot (_id, Pernr, Vorna, Nachn, Usrid, Perid, Super, SuperName, Zauve, SuperFirstName, SuperELastName)",
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
    // this.setPreloader(1);
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
      "INSERT INTO dayalot (_id, Pernr, Vorna, Nachn, Usrid, Perid, Super, SuperName, Zauve, SuperFirstName, SuperELastName) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        item["_id"],
        item["Pernr"],
        item["Vorna"],
        item["Nachn"],
        item["Usrid"],
        item["Perid"],
        item["Super"],
        item["SuperName"],
        item["Zauve"],
        item["SuperFirstName"],
        item["SuperELastName"],
      ],
      (t, results) => {},
      function (t, error) {
        console.error("Error: " + error.message);
      }
    );
  }
}
