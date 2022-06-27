import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  public isNotCordova = false;
  public isNetework = true;
  constructor(private network: Network, public platform: Platform) {}

  checkIfNetworkExsist() {
    return new Promise(async (resolve, reject) => {
      // // this.checkIfNetworkExsist1();
      // alert("checkIfNetworkExsist");
      // if (this.platform.is("cordova")) {
      //   let disconnectSubscription = this.network
      //     .onDisconnect()
      //     .subscribe(() => {
      //       alert("network was disconnected :-(");
      //       this.isNetework = false;
      //       resolve(this.isNetework);
      //     });
      //   //disconnectSubscription.unsubscribe();
      //   let connectSubscription = this.network.onConnect().subscribe(() => {
      //     alert("network connected!");
      //     this.isNetework = true;
      //     resolve(this.isNetework);
      //   });
      //   alert("CN6");
      //   //connectSubscription.unsubscribe();
      // } else {
      resolve(this.isNetework);
      //  }
    });
  }

  checkIfNetworkExsist1() {
    return new Promise((resolve, reject) => {
      if (!this.platform.is("cordova")) {
        console.log("Net : ", this.isNetework);
        resolve(this.isNetework);
      }
      if (this.platform.is("cordova")) {
        let disconnectSubscription = this.network
          .onDisconnect()
          .subscribe(() => {
            alert("false");
            this.isNetework = false;
            resolve(false);
          });
        disconnectSubscription.unsubscribe();

        let connectSubscription = this.network.onConnect().subscribe(() => {
          alert("true");
          resolve(true);
          this.isNetework = true;
          setTimeout(() => {
            if (this.network.type === "wifi") {
              console.log("we got a wifi connection, woohoo!");
            }
          }, 3000);
        });
        connectSubscription.unsubscribe();
      }
    });
  }
  
}
