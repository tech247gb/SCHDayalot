import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SuperVisorCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;
  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    console.log("SuperVisorCrudService : ", webDb);
    this.webDb = webDb;
    this.items = json;
    this.dropTable("stors");
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS supervisor",
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
        "CREATE TABLE IF NOT EXISTS supervisor (_id, Kunnr, Super, SuperFirstName, SuperELastName, Usrid, Manager, ManaSortl, ManagerFirstName, ManagerLastName, ManagUsrid, Supervmail, Managmail)",
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
      "INSERT INTO supervisor (_id, Kunnr, Super, SuperFirstName, SuperELastName, Usrid, Manager, ManaSortl, ManagerFirstName, ManagerLastName, ManagUsrid, Supervmail, Managmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        item["_id"],
        item["Kunnr"],
        item["Super"],
        item["SuperFirstName"],
        item["SuperELastName"],
        item["Usrid"],
        item["Manager"],
        item["ManaSortl"],
        item["ManagerFirstName"],
        item["ManagerLastName"],
        item["ManagUsrid"],
        item["Supervmail"],
        item["Managmail"],
      ],
      (t, results) => {},
      function (t, error) {
        console.error("Error: " + error.message);
      }
    );
  }
}
