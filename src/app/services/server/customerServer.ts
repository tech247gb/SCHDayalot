import { Injectable } from "@angular/core";
import { SettingsService } from "../global/settings.service";
import { LoadingController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CustomerServer {
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
    private http: HttpClient
  ) {}

  async sendCustomerToServer(customer) {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .post(this.setting.globalServerURL + "crm/setMembership", customer)
          .toPromise()
          .then(res => {
            //insertMaterialsToDb
            resolve(res);
            console.log("resServer: ", res);
          })
          .catch(err => {
            resolve("err");
            console.log("error:", err);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }
}
