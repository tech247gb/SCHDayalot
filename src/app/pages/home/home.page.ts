import { UtilsService } from "./../../services/utils/utils.service";
// import { CreateService } from "./../../services/db/create.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/global/settings.service";
import { SyncAPIService } from "../../services/db/webDb/sync.service";
import { DatePipe, formatDate } from "@angular/common";
import { DayalotService } from "../../services/db/webDb/dayalot/dayalot.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  dayeltForsubscribe = {
    player_id: "",
    pernr: "",
    phoneNumber: ""

  }
  isGuerlain;
  constructor(
    public dayalotDB: DayalotService,
    public settingsService: SettingsService,
    public utils: UtilsService,
    public api: ApiService,
    public Async: SyncAPIService
  ) {
    this.api.userConnect.subscribe(() => {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    });
  }

  ngOnInit() {
    //this.checkVersions();
    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
      this.dayeltForsubscribe.player_id = String(localStorage.player_id);
      this.dayeltForsubscribe.pernr = String(JSON.parse(localStorage.dayelet)["Pernr"]);
      this.dayeltForsubscribe.phoneNumber = String(JSON.parse(localStorage.dayelet)["Usrid"]);
      console.log("this.isGuerlain: ", this.isGuerlain)
      //insert pernr and phone numbber to DB
      this.dayalotDB.subscribeOnesignal(this.dayeltForsubscribe)
      // this.Async.getShiftsReports();
      // this.Async.getSales();
    }
  }

  async checkVersions() {
    let res = await this.Async.getVersion();
    if (res["upToDateVersion"]) {
      if (res["upToDateVersion"] != true) {
        this.utils.presentalertAPKVersion(
          "קיימת גירסה חדשה לעידכון! מוזמנת באהבה לעדכן. מתוקה, תאריך אחרון לעידכון  - " + formatDate(res["endDate"], 'dd.MM.yyyy', 'en') + ".  " + "בהצלחה לך עם זה!",
          this.settingsService.lastAPKurl
        );
      }
    } else if (res != true) {
      this.utils.presentalertAPK(
        "קיימת גירסה חדשה לעידכון! מוזמנת באהבה לעדכן.",
        this.settingsService.lastAPKurl
      );
    }

  }
}
