import { Injectable } from "@angular/core";
import { SettingsService } from "../global/settings.service";
import { LoadingController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Network } from "@ionic-native/network/ngx";
import { SyncAPIService } from "../db/webDb/sync.service"; 
import { UtilsService } from "../utils/utils.service";


@Injectable({
  providedIn: "root"
})
export class SalesServer {
  public webDb: any;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type",
      "Access-Control-Allow-Origin": "*"
    })
  };
  constructor(
    public setting: SettingsService,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private network:Network,
    public utils: UtilsService,

    public syncAPIService: SyncAPIService,

  ) {}

  async sendSaleToServer(products) { 
    this.webDb = this.syncAPIService.webDb;
    localStorage.queueLen=0;
    this.webDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM urlqueue",[],
        (tx, results) => {
          let resultjson = this.utils.getArrayFromJson(results.rows);
          localStorage.queueLen=resultjson.length;
        }
      );
    });
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        if(localStorage.queueLen=='0'){
          this.http
          .post(this.setting.globalServerURL + "dayalotData/setData", products)
          .toPromise()
          .then(res => {
            resolve(res);
            console.log("resServer: ", res);
          })
          .catch(err => {
            resolve("err");
            console.log("error:", err);
          });
        }else{
          alert('please wait until offline data process')
          loading.dismiss();
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
    loading.dismiss();
  }
}
