import { SalesServer } from "./saleServer";
import { SalesService } from "../db/webDb/sales/sale/sales.service";
import { UtilsService } from "./../utils/utils.service";
import { ShiftsReportsService } from "./../db/webDb/shiftsReports/shiftsReports.service";
import { Injectable } from "@angular/core";
import { SettingsService } from "../global/settings.service";
import { LoadingController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SalesFunctionsService } from "../sales/salesFunctions.service";

@Injectable({
  providedIn: "root",
})
export class ShiftServer {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  constructor(
    public setting: SettingsService,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private shiftsReportsService: ShiftsReportsService,
    private utils: UtilsService,
    private salesService: SalesService,
    private salesServer: SalesServer,
    private salesFunctionsService: SalesFunctionsService
  ) {}

  async sendShiftToServer(shift, shiftStatus, shiftId?) {
    let loading = await this.loadingCtrl.create({ message: "...בטעינה" });
    loading.present();
    try {
      return new Promise((resolve, reject) => {
        this.http
          .post(this.setting.globalServerURL + "dayalotData/setShift", shift)
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("resServer: ", res);
            if (shiftStatus == 0) {
              // this.shiftsReportsService.updatetExitShiftsReportsToDb(shift);
              this.sendSaleToServerOffLine(shiftId);

              this.utils.presentToast("המשמרת הסתיימה בהצלחה!");
            } else {
              // this.shiftsReportsService.InsertShiftsReportsToDb(shift);
              this.utils.presentToast("המשמרת התחילה בהצלחה!");
            }
            resolve(res);
          })
          .catch((err) => {
            console.log("error:gsfdadg", err);
            resolve(err);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
  }

  async sendSaleToServerOffLine(shiftId) {
    let sales: any = await this.salesService.getSalesByShiftNumberAndSendServer(
      localStorage.shiftId
    );
    console.log("typeOf :", typeof sales);
    sales = [...sales];
    console.log("sendSaleToServerOffLine: ", sales);
    // let salesArrey = this.salesFunctionsService.convertArray(sales, 0, -1, saleNum);
    let serverResult = await this.salesServer.sendSaleToServer(sales);
    console.log('saddasdsa',serverResult)

    if (serverResult != "err") {
      console.log("localStorage.shiftId ", localStorage.shiftId);
      this.salesService.updateSendToServerToDb(shiftId);
    }
  }

  getShiftID() {
    try {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.setting.globalServerURL + "dayalotData/getNumerator ")
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            console.log("resServer: ", res);
            resolve(res);
          })
          .catch((err) => {
            console.log("error:", err);
            resolve("err");
          });
      });
    } catch (err) {
      console.log(err);
    }
  }
}
