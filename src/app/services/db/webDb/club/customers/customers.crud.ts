import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CustomersCrudService {
  public webDb: any;
  public items: Array<object> = [];
  public setPreloader: Function;
  constructor() {}

  updateWebDb(webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
  }

  createDB(json, webDb, setPreloader) {
    this.setPreloader = setPreloader;
    this.webDb = webDb;
    this.items = json;
    this.dropTable("customers");

    // this.createTable();
  }

  dropTable(tableName) {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DROP TABLE IF EXISTS customers",
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
        "CREATE TABLE IF NOT EXISTS customers (Contact_id, FirstName, LastName, TelephonePrefix,TelephoneNumber, Birthdate, City, Club, dayelet_id, Supervisor_id, ShiftId,JoiningDate)",
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
        // console.log(item);
        this.insertArrayToDb(item, t);
        i++;
        if (i == this.items.length) {
          console.log("Custmers CloseDB");
          this.setPreloader(1);
          //this.webDb.close();
        }
      });
    });
  };

  insertArrayToDb(item, t) {
    if (item["CustomerClub"]) {
      t.executeSql(
        "INSERT INTO customers (Contact_id, FirstName, LastName,TelephonePrefix, TelephoneNumber, Birthdate,  City, Club, dayelet_id, Supervisor_id, ShiftId , JoiningDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          item["Contact_id"],
          item["FirstName"],
          item["LastName"],
          item["TelephonePrefix"],
          item["TelephoneNumber"],
          item["Birthdate"],
          item["City"],
          item["Club"]["Id"],
          item["CustomerClub"]["BeautyCounselor_id"],
          item["Supervisor_id"],
          item["ShiftId"],
          item["CustomerClub"]["JoiningDate"],
        ],
        (t, results) => {},
        function (t, error) {
          console.error("Error: " + error.message);
        }
      );
    }
  }
}
