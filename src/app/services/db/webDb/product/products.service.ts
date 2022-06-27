import { UtilsService } from "./../../../utils/utils.service";
import { NetworkService } from "./../../../server/network.service";
import { ProductsCrudService } from "./product.crud";
import { Injectable } from "@angular/core";
import { SyncAPIService } from "../sync.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public productCrud: ProductsCrudService,
    public syncAPIService: SyncAPIService,
    public network: NetworkService,
    public utils: UtilsService
  ) {
    this.webDb = this.syncAPIService.webDb;
  }

  getProductByMATNR = (MATNR) => {
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM products WHERE Matnr = ? LIMIT 1",
            [MATNR],
            (tx, results) => {
              console.log("getProductByMATNR0 : ");
              if (!results.rows[0]) {
                this.productNotExsist();
              }
              console.log("getProductByMATNR1 : ");
              resolve(results.rows[0]);
            }
          );
        });
        console.log("getProductByMATNR : ", MATNR);
      });
    } catch (err) {
      this.productNotExsist();
      console.log(err);
    }
  };

  async productNotExsist() {
    if (!(await this.network.checkIfNetworkExsist()))
      this.utils.presentToast("לא קיים חיבור אינטרנט אנא נסי שנית");
    else this.utils.presentalertConfirm("פריט לא קיים בקטלוג! אנא סרקי שוב");
  }
}
