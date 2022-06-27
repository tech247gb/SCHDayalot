import { CustomerServer } from "./../../../../server/customerServer";
import { CustomersCrudService } from "./customers.crud";
import { Injectable } from "@angular/core";
import { SyncAPIService } from "../../sync.service";
import { LoadingController } from "@ionic/angular";
import { SettingsService } from "../../../../global/settings.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class customersService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public customerCrud: CustomersCrudService,
    public customerServer: CustomerServer,
    public syncAPIService: SyncAPIService,
    public loadingCtrl: LoadingController,
    public setting: SettingsService,
    private http: HttpClient
  ) {}

  //https://dysch.sch.co.il:5000/crm/getMemberships?phone=1111

  async MembershipbyPhone(user) {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get<[]>(
            this.setting.globalServerURL +
              "crm/getMemberships?phone=" +
              user.Contact_id
          )
          .toPromise()
          .then((res) => {
            console.log("Cities : ", res);

            if (res) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  getCustomerExsist = (user) => {
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM customers WHERE TelephoneNumber = ? AND club = ?",
            [user.TelephoneNumber, user.club],
            function (tx, results) {
              if (results.rows.length > 0) resolve(true);
              else resolve(false);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  getCustomerByPhoneNumber = (TelephoneNumber) => {
    this.webDb = this.customerCrud.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM customers WHERE Contact_id = ?",
            [TelephoneNumber],
            function (tx, results) {
              resolve(results.rows[0]);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  getCustomerByDayelet_id = (dayelet_id) => {
    // dayelet_id = String(dayelet_id);
    this.webDb = this.customerCrud.webDb;

    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM customers WHERE dayelet_id = ?",
            [dayelet_id],
            function (tx, results) {
              let custmers = [...results.rows];
              console.log("custmers", custmers);
              resolve(custmers);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  getCustomerByPhoneNumberLike = (TelephoneNumber) => {
    this.webDb = this.syncAPIService.webDb;
    let telephone = "%" + TelephoneNumber + "%";
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM customers WHERE TelephoneNumber LIKE ? OR FirstName LIKE ? OR LastName LIKE ? OR Contact_id LIKE ?",
            [telephone, telephone, telephone, telephone],
            function (tx, results) {
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

  getCustomerByShiftId = (shiftId) => {
    this.webDb = this.customerCrud.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM customers WHERE ShiftId = ?",
            [shiftId],
            function (tx, results) {
              resolve(results.rows);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  insertCustomerToDb = (item) => {
    this.webDb = this.customerCrud.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction((t) => {
        t.executeSql(
          "INSERT INTO customers (Contact_id, FirstName, LastName, TelephonePrefix, TelephoneNumber, Birthdate,  City, Club, dayelet_id, Supervisor_id, ShiftId,JoiningDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            item["Contact_id"],
            item["FirstName"],
            item["LastName"],
            item["TelephonePrefix"],
            item["TelephoneNumber"],
            item["Birthdate"],
            item["City"],
            item["Club"],
            item["dayelet_id"],
            item["Supervisor_id"],
            item["ShiftId"],
            item["customerClub"]["JoiningDate"],
          ],
          (t, results) => {
            this.customerServer.sendCustomerToServer(item);
            resolve("success");
          },
          function (t, error) {
            console.log("Error insert: " + error.message);
          }
        );
      });
    });
  };

  updateCustomerToDb = (item) => {
    this.webDb = this.customerCrud.webDb;
    return new Promise((resolve, reject) => {
      this.webDb.transaction((t) => {
        t.executeSql(
          "UPDATE customers SET  FirstName = ? ,LastName = ? , Birthdate = ?, AddressLine2 = ? WHERE TelephoneNumber = ?",
          [
            item["FirstName"],
            item["LastName"],
            item["Birthdate"],
            item["AddressLine2"],
            item["TelephoneNumber"],
          ],
          (t, results) => {
            this.customerServer.sendCustomerToServer(item);
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
