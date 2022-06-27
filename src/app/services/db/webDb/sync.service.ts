import { async } from "@angular/core/testing";
import { UtilsService } from "./../../utils/utils.service";
import { NetworkService } from "./../../server/network.service";
import { ShiftsReportsCrudService } from "./shiftsReports/shiftsReports.crud";
import { SuperVisorCrudService } from "./SuperVisor/supervisor.crud";
import { StorsCrudService } from "./stors/stors.crud";
import { CustomersCrudService } from "./club/customers/customers.crud";
import { CompanyCrudService } from "./club/company/company.crud";
import { ProductsCrudService } from "./product/product.crud";
import { LoadingController, Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SettingsService } from "../../global/settings.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DayalotCrudService } from "./dayalot/dayalot.crud";
import { SalesCrudService } from "./sales/sale/sales.crud";
import { HTTP } from "@ionic-native/http/ngx";
import { SaleItemsCrudService } from "./sales/saleItems/saleItems.crud";
import { CitiesCrudService } from "./cities/cities.crud";
import { Device } from "@ionic-native/device/ngx";
import { UrlqueueCrudService } from "./urlqueue/urlqueue.crud";

@Injectable({
  providedIn: "root",
})
export class SyncAPIService {
  public webDb;
  public dayeletDetails;
  public preloaderCounter: number = 0;
  public mainLoader;

  httpOptions = {
    headers: new HttpHeaders({
      // "content-Type": "application/json",
      // Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      // "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      // "Access-Control-Allow-Headers":
      //   "Origin, Content-Type, X-Auth-Token, content-type",
      // "Access-Control-Allow-Origin": "*"
    }),
  };

  constructor(
    public setting: SettingsService,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private productsCrud: ProductsCrudService,
    private comanyCrud: CompanyCrudService,
    private customerCrud: CustomersCrudService,
    private urlCrud: UrlqueueCrudService,
    private storsCrud: StorsCrudService,
    private dayalotCrud: DayalotCrudService,
    private superVisorCrud: SuperVisorCrudService,
    private shiftsReportsCrudService: ShiftsReportsCrudService,
    private salesCrudService: SalesCrudService,
    private saleItemsCrudService: SaleItemsCrudService,
    private httpNative: HTTP,
    public platform: Platform,
    public network: NetworkService,
    public utils: UtilsService,
    public cities: CitiesCrudService,
    private device: Device
  ) {
    this.webDb = (<any>window).openDatabase(
      "Dayalot",
      "1.0",
      "1234",
      2 * 1024 * 1024
    );
    if (localStorage.dayelet)
      this.dayeletDetails = JSON.parse(localStorage.dayelet);

    this.preloaderCounter = 0;
    console.log("LocalStorageSYNC: ", this.dayeletDetails);
  }

  async startSync(status?) {
    if (localStorage.dayelet)
      this.dayeletDetails = JSON.parse(localStorage.dayelet);

    // if (await this.network.checkIfNetworkExsist()) {

    // this.getDayalot();
    // this.startPreloader();

    // if (status == 1) this.getMaterials();
    // } else {
    // this.getDayalot();
    // this.utils.presentToast("מצטערת! אין לך חיבור לאינטרנט");
    // }
    // this.dayeletDetails = JSON.parse(localStorage.dayelet);
    // this.preloaderCounter = 0;
    // console.log(this.dayeletDetails);
    if (status == 1) {
      // this.saleItemsCrudService.createDB("", this.webDb, this.setPreloader);
      this.getCompanys();
      this.getCustomers();
      this.getStors();
      this.getMaterials();
      this.addUrls();
      // this.getSuperVisor();
      // this.getShiftsReports();
      // this.getSales();
      this.startPreloader();
      this.getCities();
    } else {
      // this.getCustomers();
      this.customerCrud.updateWebDb(this.webDb, this.setPreloader);
      // this.startPreloader();
    }
  }

  async startPreloader() {
    console.log("StartPreloader");
    this.mainLoader = await this.loadingCtrl.create({ message: "...בטעינה" });
    this.mainLoader.present();
  }

  setPreloader = (num) => {
    console.log("setPreloader : ", num, typeof this.preloaderCounter);
    this.preloaderCounter++;
    console.log("counter : ", this.preloaderCounter);
    this.mainLoader.dismiss();
    if (this.preloaderCounter >= 1) {
      this.mainLoader.dismiss();
    }
  };

  async getMaterials() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalURL + "getMaterials")
          // .get("assets/jsons/getMaterials.json", this.httpOptions)
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log(res);
            this.productsCrud.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getCompanys() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get("assets/jsons/company.json", this.httpOptions)
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            this.comanyCrud.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }
  async addUrls() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      
      this.urlCrud.createDB(this.webDb, this.setPreloader)
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getCities() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalServerURL + "ecc/getCities")
          .toPromise()
          .then((res) => {
            console.log("Cities : ", res);
            this.cities.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getCustomers() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    console.log("getCustomers1");
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalServerURL + "crm/getMemberships")
          .toPromise()
          .then((res) => {
            console.log("getCustomers2", res);
            this.customerCrud.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getStors() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalURL + "getCustomers")
          // .get("assets/jsons/stors.json", this.httpOptions)
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            this.storsCrud.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getDayalot() {
    // this.setPreloader(1);
  //   console.log("test1");
  //   let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
  //   loading.present();
  //   try {
  //     return new Promise((resolve, reject) => {
  //       this.http
  //         .get(this.setting.globalURL + "getDayalot")
  //         // .get("assets/jsons/dayalot.json", this.httpOptions)
  //         .toPromise()
  //         .then((res) => {
  //           console.log(res);
  //           //insertMaterialsToDb
  //           this.dayalotCrud.createDB(res, this.webDb, this.setPreloader);
  //         })
  //         .catch((err) => console.log("error:", err));
  //     });
  //     // this.setPreloader(1);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     loading.dismiss();
  //   }
  }

  async getSuperVisor() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalURL + "getSuperVisors")
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            this.superVisorCrud.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getShiftsReports() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    let dayeltePERNR = "";
    if (this.dayeletDetails) {
      dayeltePERNR = this.dayeletDetails.Pernr;
    }

    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getShifts?dayelet=" +
              dayeltePERNR
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("RES: ", res);
            this.shiftsReportsCrudService.createDB(
              res,
              this.webDb,
              this.setPreloader
            );
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getSales() {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    let dayeltePERNR = "";
    if (this.dayeletDetails) {
      dayeltePERNR = this.dayeletDetails.Pernr;
    }

    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotData/getData?dayelet=" +
              dayeltePERNR
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("RES: ", res);
            this.salesCrudService.createDB(res, this.webDb, this.setPreloader);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async getVersion() {
    let dayeltePERNR = "";
    if (this.dayeletDetails) {
      dayeltePERNR = this.dayeletDetails.Pernr;
    }
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalServerURL +
              "dayalotApp/currentVersion?deviceVersion=" +
              this.setting.currentVersion +
              "&pernr=" +
              dayeltePERNR +
              "&deviceModel=" +
              this.device.platform +
              " | " +
              this.device.version +
              "|" +
              this.device.manufacturer +
              " | " +
              this.device.model
            // "https://192.168.101.219:5000/dayalotApp/currentVersion?" +
            //   this.setting.currentVersion
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log(res);
            resolve(res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    }
  }
}
