import { StorsCrudService } from "./stors.crud";
import { Injectable } from "@angular/core";
import { SyncAPIService } from "../sync.service";

@Injectable({
  providedIn: "root",
})
export class StorsService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public storsCrud: StorsCrudService,
    public async: SyncAPIService
  ) {}

  getStorsByNameLike = (name) => {
    console.log(name);
    this.webDb = this.async.webDb;
    let search = "%" + name + "%";
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM stors WHERE Kunnr LIKE ? OR Name1 LIKE ?",
            [search, search],
            function (tx, results) {
              let arr = [...results.rows];
              console.log(arr);
              resolve(arr);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  getStorByNumber = (Kunnr) => {
    return new Promise((resolve, reject) => {
      try {
        this.webDb = this.async.webDb;
        // resolve("1111");
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM stors WHERE Kunnr = ?",
            [Kunnr],
            function (tx, results) {
              resolve(results.rows[0]);
            }
          );
        });
        console.log("getStorByNumber : ", Kunnr);
      } catch (err) {
        console.log(err);
      }
    });
  };
}
