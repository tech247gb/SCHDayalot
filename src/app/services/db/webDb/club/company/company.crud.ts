import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompanyCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;

  constructor() {}

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.items = json;
    this.dropTable("companys");
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS companys",
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
        "CREATE TABLE IF NOT EXISTS companys (Id, Name)",
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
          this.setPreloader(1);
        }
      });
    });
  };

  insertArrayToDb(item, t) {
    t.executeSql(
      "INSERT INTO companys (Id, Name) VALUES (?,?)",
      [item["Id"], item["Name"]],
      (t, results) => {},
      function (t, error) {
        console.error("Error: " + error.message);
      }
    );
  }
}
