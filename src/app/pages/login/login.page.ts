import { AppComponent } from "./../../app.component";
import { SyncAPIService } from "./../../services/db/webDb/sync.service";
import { NetworkService } from "./../../services/server/network.service";
import { UtilsService } from "./../../services/utils/utils.service";
import { Router } from "@angular/router";
import { DayalotService } from "./../../services/db/webDb/dayalot/dayalot.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import * as moment from "moment";
import { SettingsService } from "../../services/global/settings.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  dayelet = {
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
    public dayalotDB: DayalotService,
    public router: Router,
    public utils: UtilsService,
    public api: ApiService,
    public network: NetworkService,
    public sync: SyncAPIService,
    public setting: SettingsService
  ) {
    if (localStorage.dayelet && localStorage.dayelet != "") {
      // this.sync.startSync();
      // this.sync.getShiftsReports();
      // this.sync.getSales();
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {

  }

  async getDayelet() {
    if (String(this.dayelet.Usrid)[0] != "0") {
      this.dayelet.Usrid = "0" + String(this.dayelet.Usrid);
    }
    this.dayelet.Pernr = String(this.dayelet.Pernr);

    let result: any;

    //         //conect to Onesignal
    //   var notificationOpenedCallback = function(jsonData) {
    //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //   };

    //   window["plugins"].OneSignal.getIds(function(ids) {
    //     console.log("User accepted notifications: " + ids.userId);
    //   });
    //       // Set your iOS Settings
    // var iosSettings = {};
    // iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    // iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    // window["plugins"].OneSignal
    //   .startInit("fbd8925f-dc8a-48cf-bad9-4b02e2fc9e0f")
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .iOSSettings(iosSettings)
    //   .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
    //   .endInit();






    // // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    // window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
    //   console.log("User accepted notifications: " + accepted);
    // });

    try {
      result = await this.dayalotDB.getDayeletByNumber(this.dayelet);

      if (result) {
        localStorage.dayelet = JSON.stringify(result);


        this.api.userDetails = result;
        this.dayelet.Usrid = "";
        this.dayelet.Pernr = "";
        this.sync.startSync(1);
        localStorage.lastSync = JSON.stringify(moment(new Date()));
        //this.sync.getShiftsReports();
        // this.sync.getSales();

        this.api.userConnect.next("");

        this.router.navigate(["/home"]);
      } else {
        this.userNotFound();
      }
    } catch (err) {
      this.userNotFound();
    }
  }

  async userNotFound() {
    if (!(await this.network.checkIfNetworkExsist()))
      this.utils.presentToast("לא קיים חיבור אינטרנט אנא נסי שנית");
    else this.utils.presentToast("מצטערת! את לא רשומה במערכת.");
  }
  systemSelect(num) {
    console.log("work ", num)
    localStorage.system = num;

    if (localStorage.system == 1) {
      // ***** DEV *****
      this.setting.globalURL = "https://192.168.101.219:5000/ecc/";
      this.setting.globalServerURL = "https://192.168.101.219:5000/";
      this.setting.currentVersion = "1.04";

    } else if (localStorage.system == 2) {
      // ***** QA *****
      this.setting.globalURL = "https://192.168.101.220:5000/ecc/";
      this.setting.globalServerURL = "https://192.168.101.220:5000/";

    } else if (localStorage.system == 3) {
      // ***** PROD *****
      this.setting.globalURL = "https://dysch.sch.co.il:5000/ecc/";
      this.setting.globalServerURL = "https://dysch.sch.co.il:5000/";
      this.setting.currentVersion = "2.00";
    } else if (localStorage.system == 4) {
      // ***** sand box *****
      this.setting.globalURL = "https://192.168.101.220:5001/ecc/";
      this.setting.globalServerURL = "https://192.168.101.220:5001/";
    }


  }
}
