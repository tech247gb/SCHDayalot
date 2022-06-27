import { DayalotCrudService } from "./dayalot.crud";
import { Injectable } from "@angular/core";
import { SyncAPIService } from "../sync.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SettingsService } from "../../../global/settings.service";

@Injectable({
  providedIn: "root",
})

export class DayalotService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
      "Access-Control-Allow-Origin": "*"
    })
  };
  public webDb: any;
  public products: Array<object> = [];

  constructor(
    public dayalotCrud: DayalotCrudService,
    public syncAPIService: SyncAPIService,
    private http: HttpClient,
    public setting: SettingsService
  ) {}

  getDayeletByNumber = (dayelet) => {
    dayelet.Pernr = Number(dayelet.Pernr);
    this.webDb = this.syncAPIService.webDb;
    try {
      if(localStorage.token){
        const now = new Date();
        let localToken = localStorage.token ? JSON.parse(localStorage.token) : '';
        console.log(localToken.value)
        let tokenData = localToken && localToken.value ? localToken.value : '';
        if (tokenData) {
          if (now.getTime() > localToken.expiry) {
            localStorage.removeItem('token')
            localStorage.Usrid = dayelet.Usrid;
            localStorage.Pernr = dayelet.Pernr;
            console.log('Token expired')
          }
         
        }

      } else {
        localStorage.setItem('Usrid', dayelet.Usrid);
        localStorage.setItem('Pernr', dayelet.Pernr);
      }
      return new Promise((resolve, reject) => {
        this.http
          .get(
            this.setting.globalURL +
              "getDayalot?pernr=" +
              dayelet.Pernr +
              "&usrid=" +
              dayelet.Usrid,
            
          )
         
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            resolve(res);
            // console.log("RES: ", res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    }
  };

  subscribeOnesignal = (dayeltForSubscribe) =>{

    try {
      return new Promise((resolve, reject) => {
        this.http
          .post(
            this.setting.globalServerURL +
            "dayalotApp/subscribe" , dayeltForSubscribe
          )
          .toPromise()
          .then((res) => {
            //insertMaterialsToDb
            resolve(res);
            // console.log("RES: ", res);
          })
          .catch((err) => console.log("error:", err));
      });
    } catch (err) {
      console.log(err);
    }
  };
  getDayeletByNumberOnly = (dayelet_id) => {
    this.webDb = this.syncAPIService.webDb;
    dayelet_id = String(dayelet_id);
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM dayalot WHERE Perid = ?",
            [dayelet_id],
            function (tx, results) {
              resolve(results.rows[0]);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
}
