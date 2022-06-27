import { Injectable } from "@angular/core";
import { SettingsService } from "../../../global/settings.service";
import { LoadingController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UtilsService } from "../../../utils/utils.service";

@Injectable({
  providedIn: "root",
})
export class reportsAPIService {
  public dayeletDetails;
  constructor(
    public setting: SettingsService,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public utils: UtilsService
  ) {
    if (localStorage.dayelet)
      this.dayeletDetails = JSON.parse(localStorage.dayelet);
  }

  async getPidyonReport() {
    if (localStorage.dayelet)
      this.dayeletDetails = JSON.parse(localStorage.dayelet);
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    let dayeltePERNR;
    if (this.dayeletDetails) {
      dayeltePERNR = Number(this.dayeletDetails.Pernr);
    }

    // dayeltePERNR = "2853";

    try {
      return new Promise((resolve, reject) => {
        this.http
          .get<[]>(
            this.setting.globalServerURL +
            // for next version 
            // "bw/getDayeletStoreTargets?pernr=" +
            "bw/getDayeletStoreTargets?zdayelet=" +
            dayeltePERNR
          )
          .toPromise()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getDayeletPiryons() {
    if (localStorage.dayelet)
      this.dayeletDetails = JSON.parse(localStorage.dayelet);
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    let dayeltePERNR;
    if (this.dayeletDetails) {
      dayeltePERNR = Number(this.dayeletDetails.Pernr);
    }
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
            "bw/getDayeletPiryons?zdayelet=" +
            dayeltePERNR +
            "&isDayelet=true"
          )
          .toPromise()
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }
}
