import { Injectable } from "@angular/core";
import { ToastController, AlertController, Platform } from "@ionic/angular";
import { AppRate } from "@ionic-native/app-rate/ngx";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private appRate: AppRate,
    public platform: Platform
  ) {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      cssClass: "mainToast",
    });
    toast.present();
  }

  async presentalertConfirm(message, header?) {
    if (header == "") {
      header = "שימי לב!";
    }
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: "ביטול",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel: blah");
              resolve(0);
            },
          },
          {
            text: "אישור",
            handler: () => {
              console.log("Confirm Okay");
              resolve(1);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async presentalertAPK(message, APKurl) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: "שימי לב !",
        message: message,
        cssClass: "mainToast",
        backdropDismiss: false, // <- Here! :)
        buttons: [
          {
            text: "סגור אפליקציה",
            handler: (blah) => {
              navigator["app"].exitApp();
              // resolve(0);
            },
          },
          {
            text: "עידכון גירסה",
            handler: () => {
              window.open(APKurl, '_blank');
              resolve(1); 
              // window.location.href = APKurl;
              // resolve(1);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async presentalertAPKVersion(message, APKurl) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: "שימי לב !",
        message: message,
        cssClass: "mainToast",
        backdropDismiss: false, // <- Here! :)
        buttons: [
          {
            text: "מאוחר יותר",
            handler: (blah) => {
              // navigator["app"].exitApp();
              resolve(0);
            },
          },
          {
            text: "עידכון גירסה",
            handler: () => {
              window.open(APKurl, '_blank');
              resolve(1); 
              // window.location.href = APKurl;
              // resolve(1);
            },
          },
        ],
      });

      await alert.present();
    });
  }
  getArrayFromJson(obj) {
    let arr = [];
    for (let i = 0; i < obj.length; i++) {
      arr.push(obj[i]);
    }
    return arr;
  }
}
