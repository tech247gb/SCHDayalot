import { SuperVisorCrudService } from "./supervisor.crud";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SuperVisorService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(public superVisorCrud: SuperVisorCrudService) {}

  getSuperVisorByNumber = Super => {
    this.webDb = this.superVisorCrud.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function(tx) {
          tx.executeSql(
            "SELECT * FROM supervisor WHERE Super = ?",
            [Super],
            function(tx, results) {
              resolve(results.rows[0]);
            }
          );
        });
        console.log("getSuperVisorByNumber : ", Super);
      });
    } catch (err) {
      console.log(err);
    }
  };
}
