import { Injectable } from "@angular/core";
import { SyncAPIService } from "../sync.service";
import { CitiesCrudService } from "./cities.crud";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public citiesCrud: CitiesCrudService,
    public syncAPIService: SyncAPIService
  ) {}

  getCityByNameLike = (name) => {
    console.log("NM");
    this.webDb = this.syncAPIService.webDb;
    let search = name + "%";
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM cities WHERE CityName LIKE ? ",
            [search],
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

  checkIfExsistCity = (name) => {
    return new Promise((resolve, reject) => {
      try {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM cities WHERE CityName = ? ",
            [name],
            function (tx, results) {
              let arr = [...results.rows];
              console.log("CITY : ", arr);
              if (arr.length > 0) resolve(true);
              else resolve(false);
            }
          );
        });
      } catch (err) {
        resolve(err);
      }
    });
  };
  // getDayeletByNumber = dayelet => {
  //   this.webDb = this.syncAPIService.webDb;
  //   try {
  //     return new Promise((resolve, reject) => {
  //       this.webDb.transaction(function(tx) {
  //         tx.executeSql(
  //           "SELECT * FROM dayalot WHERE Pernr = ? AND Usrid = ?",
  //           [dayelet.Pernr, dayelet.Usrid],
  //           function(tx, results) {
  //             resolve(results.rows[0]);
  //           }
  //         );
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
}
