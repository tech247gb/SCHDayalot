import { SettingsService } from "./services/global/settings.service";
import { StorsService } from "./services/db/webDb/stors/stors.service";
import { UtilsService } from "./services/utils/utils.service";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";

import { Platform, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ApiService } from "./services/api.service";
import { SyncAPIService } from "./services/db/webDb/sync.service";
import { BarcodeService } from "./services/global/barcode.service";
import { ImagesService } from "./services/images/images.service";
import { Plugins } from "@capacitor/core";
import { ShiftsReportsService } from "./services/db/webDb/shiftsReports/shiftsReports.service";
const { App } = Plugins;
import * as moment from "moment";
import { Network } from "@ionic-native/network/ngx";
import { UrlqueueService } from "./services/db/webDb/urlqueue/urlqueue.service";
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  // @ViewChildren(IonRouterOutlet) routerOutlets: QueryList;
  isGuerlain;
  public selectedIndex = 0;
  public inShift: Boolean;
  public BatteryStatus;
  public lastSync;
  public version;
  public appPages = [
    {
      title: "עמוד הבית",
      url: "/home",
      icon: "home",
    },
    {
      title: "הוסיפי חבר מועדון",
      url: "/add-member",
      icon: "person-add",
    },
    {
      title: "שאילתת מוצר - סריקה",
      url: "/product-info",
      icon: "camera",
    },
    {
      title: "שאילתת מוצר - מק''ט",
      url: "/product-info-number",
      icon: "search",
    },
    {
      title: "החזרות מוצרים",
      url: "/return",
      icon: "shuffle",
    },
    {
      title: "דוחות ודיווחים",
      url: "/reports",
      icon: "receipt",
    },
    {
      title: "הודעות הנהלה",
      url: "/folder/Archived",
      icon: "chatbox-ellipses",
    },
    {
      title: "מחיקת נתונים",
      url: "/clean",
      icon: "trash-bin",
    },
    {
      title: "ריענון נתונים",
      url: "/refresh",
      icon: "refresh-circle",
    },
    {
      title: "סיימי משמרת",
      // url: "/folder/Trash",
      icon: "alarm",
    },
    {
      title: "התנתקי",
      url: "/login",
      icon: "log-out",
    },
  ];

  public userName = {};
  env:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public api: ApiService,
    private sync: SyncAPIService,
    public router: Router,
    public utils: UtilsService,
    public barcodeService: BarcodeService,
    public storsService: StorsService,
    public imagesService: ImagesService,
    public shiftReportService: ShiftsReportsService,
    public settingsService: SettingsService,
    private network: Network,
    private appVersion: AppVersion,
    private urlService:UrlqueueService,
    private appUpdate: AppUpdate
  ) {
    if (this.isGuerlain) {
      this.api.userConnect.subscribe(() => {
        this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
      });
    }
    platform.ready().then(() => {
      this.listenConnection();
    })

    
    //this.sync.getMaterials();
    this.initializeApp();

    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (1 == 1) {
    //     App.exitApp();
    //   }
    // });
    this.backButtonEvent();
  }

  calculateDuration() {
    try {
      var now = moment(new Date()); //todays date
      var end = JSON.parse(localStorage.lastSync); // another date
      var duration = moment.duration(now.diff(end));

      return duration.asHours();
    } catch (err) {
      return -1;
    }
  }

  calculateDurationDays() {
    try {
      var now = moment(new Date()); //todays date
      var end = JSON.parse(localStorage.lastCheckShift); // another date
      var duration = moment.duration(now.diff(end));
      // console.log(duration, duration.asDays(), now.isSame(end, 'd'))
      return now.isSame(end, 'd');
    } catch (err) {
      return -1;
    }
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
      if (this.router.url === "/home" && localStorage.isBarcode == "false") {
        navigator["app"].exitApp();
      } else if (localStorage.isBarcode != "false") {
        localStorage.isBarcode = "false";
        this.router.navigate["/home"];
      } else {
        window.history.back();
      }
      // });
    });
  }

  async checkStatusShift() {
    if (!this.calculateDurationDays() || !localStorage.lastCheckShift) {
      let inShift = await this.shiftReportService.getShiftStatus(
        JSON.parse(localStorage.dayelet)["Pernr"]
      );
      localStorage.lastCheckShift = JSON.stringify(moment(new Date()));
      console.log(inShift, inShift["shiftStatus"]);
      if (inShift["shiftStatus"] == 2) {
        localStorage.inShift = JSON.stringify(false);
        this.api.inShiftB.next(false);
        localStorage.currentStor = "";
        localStorage.currentStorTemp = "";
        localStorage.shiftId = "";
        localStorage.saleNum = 1;
        localStorage.returnNum = 1;
        this.utils.presentalertConfirm("המשמרת הקודמת נסגרה אוטומטית.");
        this.router.navigate(["/home"]);
      }
    }
  }
  initializeApp() {
    this.version = this.settingsService.currentVersion;
    this.version = this.settingsService.branch
    this.checkStatusShift();
    this.platform.ready().then(() => {
      const updateUrl = this.settingsService.globalServerURL+'SCHDayalot.xml';
      this.appUpdate.checkAppUpdate(updateUrl).then(update => {
        if(update.code === 202){
          alert("האפליקציה עודכנה בהצלחה");
        }else if(update.code === 201){
          alert("סטטוס עדכון: הצלחה, צריך עדכון");
        }
      }).catch(error=>{
        console.log(error);
         alert("Error: "+error.msg);
      });
      this.appVersion.getVersionNumber().then((res:any )=> {
        this.version = res;
        console.log(this.version);
      }).catch(error => {
        console.log(error);
      });
      this.userName = this.api.userDetails;
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString("#999999");
      this.splashScreen.hide();
      
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

     

          // Set your iOS Settings
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    
    window["plugins"].OneSignal
      .startInit("fbd8925f-dc8a-48cf-bad9-4b02e2fc9e0f")
      .handleNotificationOpened(notificationOpenedCallback)
      .iOSSettings(iosSettings)
      .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
      .endInit();
    
    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
    });
  
    window["plugins"].OneSignal.getIds(function(ids) {
      localStorage.player_id = ids.userId;
      console.log(ids.userId)
    });
      // console.log(this.calculateDuration(JSON.parse(localStorage.lastSync)));
      if (this.calculateDuration() > 12) {
        this.sync.startSync(1);
        localStorage.lastSync = JSON.stringify(moment(new Date()));
      } else {
        this.sync.startSync(2);
        // this.sync.startPreloader();
        // this.sync.getDayalot();
      }

      // if (
      //   this.platform.is("cordova")
      //   //  && this.BatteryStatus
      // ) {
      // setTimeout(function () {
      //   this.BatteryStatus.onChange().subscribe((status) => {
      //     this.BatteryStatus = status;
      //   });
      // }, 500);

      // this.platform.resume.subscribe(async () => {

      window["paused"] = 0;
      // });
      // }
    });
  }

  // else if (this.appPages[i].url == "/add-member" && !this.inShift) {
  //   this.utils.presentToast("מצטערת! לא ניתן להוסיף חבר מועדון מחוץ למשמרת.");
  // }

  navigateFN(i) {
    this.selectedIndex = i;
    if (this.appPages[i].url == "/return" && !this.inShift) {
      this.utils.presentToast("מצטערת! לא ניתן להחזיר מוצרים מחוץ למשמרת.");
    } else if (
      this.appPages[i].url == "/add-member" &&
      this.isGuerlain != "1"
    ) {
      this.utils.presentToast("מצטערת! לא ניתן להוסיף חבר מועדון.");
    } else if (this.appPages[i].url == "/refresh") {
      this.sync.startSync(1);
      localStorage.lastSync = JSON.stringify(moment(new Date()));
      // this.sync.getShiftsReports();
      // this.sync.getSales();
      this.router.navigate(["/home"]);
    } else if (this.appPages[i].url == "/clean") {
      localStorage.clear();
      // this.initializeApp();
      this.router.navigate(["/login"]);     
    } else {
      this.router.navigate([this.appPages[i].url]);
    }
  }

  ngOnInit() {
    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    }
    this.api.inShiftB.subscribe((value) => {
      this.inShift = value;
      this.checkShift();
    });

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  async logOut() {
    let answer: any;

    if (this.inShift == true) {
      answer = await this.utils.presentalertConfirm(
        "הנך עומדת להתנתק במהלך משמרת. האם ברצונך לסיים משמרת? "
      );
    }

    if (this.inShift == false) this.logOutAfterScan();
    else if (answer == "1") {
      if (!this.platform.is("cordova")) {
        this.checkIfStroeExsis("900164");
      } else {
        // this.barcodeService.scanBarcode(this.checkIfStroeExsis);
        this.router.navigate(["/shift", 0]);
      }
    }
  }

  checkIfStroeExsis = async (storId) => {
    let storResult: any = await this.storsService.getStorByNumber(storId);

    if (storResult) {
      this.logOutAfterScan();
    } else {
    }
  };

  async logOutAfterScan() {
    this.inShift = false;
    localStorage.inShift = JSON.stringify(false);
    localStorage.dayelet = "";
    localStorage.currentStor = "";
    this.api.inShiftB.next(false);
    this.api.userDetails = {};
    this.router.navigate(["/login"]);
  }

  checkShift() {
    if (this.inShift) {
      this.appPages[9]["title"] = "סיימי משמרת";
      this.appPages[9]["url"] = "/shift/0";
    } else {
      this.appPages[9]["title"] = "התחילי משמרת";
      this.appPages[9]["url"] = "/shift/0";
    }
  }
  listenConnection() {
    console.log(this.network);
    this.network.onConnect()
      .subscribe((res) => {
        console.log(res);
        if(res.type=='online'){
          this.urlService.apiCallList();
        }
      });
  }

  
}
