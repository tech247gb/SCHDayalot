import { CompanyCrudService } from "./company.crud";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(public companyCrud: CompanyCrudService) {}

  getComanys = () => {
    this.webDb = this.companyCrud.webDb;
    return new Promise((resolve, reject) => {
      try {
        this.webDb.transaction(function (tx) {
          tx.executeSql("SELECT * FROM companys", [], function (tx, results) {
            resolve(results);
          });
        });
      } catch (err) {
        resolve({ id: 456 });
      }
    });
  };
}
