import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { BatteryStatus } from "@ionic-native/battery-status/ngx";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public inShiftB = new BehaviorSubject(false);
  public userConnect = new BehaviorSubject("");
  public dayCode = new BehaviorSubject({});
  public subscription;
  public BatteryStatus;
  public userDetails: any = {
    _id: "",
    Pernr: "",
    Vorna: "",
    Nachn: "",
    Usrid: "",
    Super: "",
    SuperName: "",
    Zauve: "",
    SuperFirstName: "",
    SuperELastName: "",
  };

  constructor(
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private batteryStatus: BatteryStatus,
    public platform: Platform
  ) {
    this.getDayCode();
    // alert("Battary0 : ");
    if (localStorage.inShift) {
      this.inShiftB.next(JSON.parse(localStorage.inShift));
    }
    // alert("Battary1 : ");
    if (localStorage.dayelet) {
      this.userDetails = JSON.parse(localStorage.dayelet);
      console.log("localStorage.dayalot:", localStorage.dayelet);
    }
    if (this.platform.is("cordova")) {
      // alert("B1");
      window.addEventListener("batterystatus", this.onBatteryStatus, false);

      // alert("Battary : " + this.BatteryStatus);
      // setTimeout(function () {
      //   this.batteryStatus.onChange().subscribe((status) => {
      //     alert("Battary1 : " + status);
      //     this.BatteryStatus = status;
      //     console.log("this.BatteryStatus;", this.BatteryStatus);
      //   });
      // }, 500);
    }
  }

  onBatteryStatus(status) {
    // alert("B2 : " + status);
    // alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
  }

  ionViewWillLeave() {
    // stop watch
    //this.subscription.unsubscribe();
  }

  async getUserDetails() {
    let url = "wwww";
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        let data = {
          id: "10",
        };

        resolve(this.userDetails);
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getDayCode() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get("assets/jsons/codeForDay.json")
          .toPromise()
          .then((res) => {
            this.dayCode.next(res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }
}
