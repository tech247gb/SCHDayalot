import { UrlqueueCrudService } from "./urlqueue.crud";
import { Injectable } from "@angular/core";
import { SyncAPIService } from "../sync.service";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { UtilsService } from "../../../utils/utils.service";
import { SettingsService } from "../../../global/settings.service";
import { Network } from "@ionic-native/network/ngx";


@Injectable({
  providedIn: "root",
})

export class UrlqueueService {
  public webDb: any;
  httpOptions = {
    headers: new HttpHeaders()
    .set('Flag','1')
  };
  params = new HttpParams();

  constructor(
    public urlqueueCrud: UrlqueueCrudService,
    public syncAPIService: SyncAPIService,
    public utils: UtilsService,
    public setting: SettingsService,
    private http: HttpClient,
    private network: Network,
  ) {
    
  }
  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  insertUrlToDb = (item) => {
    this.webDb = this.syncAPIService.webDb;
    console.log(item);
    return new Promise((resolve, reject) => {
      this.webDb.transaction((t) => {
        t.executeSql(
          "INSERT INTO urlqueue (id,url, request,retry_count) VALUES (?,?,?,?)",
          [
            this.getUniqueId(5),
            item["url"],
            item["request"],
            0
          ],
          (t, results) => {
            console.log('jashdasd',results)
            // this.customerServer.sendCustomerToServer(item);
            resolve("success");
          },
          function (t, error) {
            console.log("Error insert: " + error.message);
          }
        );
      });
    });
  };

apiCallList = () => {
    this.webDb = this.syncAPIService.webDb;
    try {
      return new Promise((resolve, reject) => {
        this.webDb.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM urlqueue",[],
            (tx, results) => {
              let resultjson = this.utils.getArrayFromJson(results.rows);
              if(resultjson.length>0){
                  resultjson.forEach(element => {
                    let value=JSON.parse(element.request);
                    try {
                      return new Promise((resolve, reject) => {
                        this.http
                          .post(element.url, value,this.httpOptions)
                          .toPromise()
                          .then(res => {
                           this.deleteFromDb(element.id);
                           resolve(res);
                          })
                          .catch(err => {
                            resolve("err");
                            if(element.retry_count<5) {
                              let retryVal=element;
                              this.deleteFromDb(element.id);
                              retryVal.retry_count+=1;
                              this.insertUrlToDb(retryVal);
                            }else{
                              this.deleteFromDb(element.id);
                            }
                          });
                      });
                    } catch (err) {
                      console.log(err);
                    }
                });
                }else{
                  // alert('You no apis pending in internal storage')
                }
               
              resolve(results.rows);
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
}; 
deleteFromDb = (item) => {
  this.webDb = this.syncAPIService.webDb;
  console.log(item);
  return new Promise((resolve, reject) => {
    this.webDb.transaction((t) => {
      t.executeSql(
        "DELETE FROM urlqueue WHERE id = ?",
        [
          item,
        ],
        (t, results) => {
          console.log('jashdasd',results)
          // this.customerServer.sendCustomerToServer(item);
          resolve("success");
        },
        function (t, error) {
          console.log("Error insert: " + error.message);
        }
      );
    });
  });
};

}
