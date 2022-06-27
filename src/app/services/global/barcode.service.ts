import { UtilsService } from "./../utils/utils.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ZBar, ZBarOptions } from "@ionic-native/zbar/ngx";
import { WebIntent } from "@awesome-cordova-plugins/web-intent/ngx";

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  public userDetails: any = {};
  constructor(
    // private barcodeScanner: BarcodeScanner,
    public utils: UtilsService,
    private webIntent: WebIntent // private zbar: ZBar
  ) {}

  // options: ZBarOptions = {
  //   flash: "on",
  //   drawSight: false,
  //   text_title: "נא הכניסי ברקוד", // Android only
  //   text_instructions: "מצמצת. פספספת. אז בבקשה!", // Android only
  // };

  options = {
    action: 'com.netalizer.gazpacho.barcodescanner.pro.SCAN',
    extras: {
      userId: '100',
      projectKey:
        '0.CZ7XvI6Xwzb55pQzjLQF_eKOEXesedlhUWLKxYzgpufPVAYDC6MKVlJC9EIPD9Jv9qCfMWxnGS_yVSi4hyx7HeE1KJj9Cv1TMW-T1GfuJ1XF9nEWamoGvo_fbrsDu5ERO9vy5iKzYlnD5LklMqwUJzEjngrPTuEe-_-zYaZZfIdDoTZSeQUFoFXiRRMukFcB_NE5W_Byh0DeWAlDiu3U0IVSr5iMhcmEIoK8DE4y4WbrtaaBKLthLNLliXKqQKDmE7OImPOe7c1-sACOea2zRP7YdQA48sYbYD9i4y3Q_9ynNtTAiHuhApD77MlmrMFLDd5Gda0Anr0bKllhYTFnWg',
    },
  };
  barcode: Promise<any>;
  async scanBarcode(returnFn, type?) {
    this.userDetails = JSON.parse(localStorage.dayelet);
    this.options.extras.userId = String(this.userDetails["Pernr"]);
    console.log(this.options);
    try {
      this.barcode = await this.webIntent.startActivityForResult(this.options);
    } catch (err) {
      this.utils.presentalertAPK("סורק הברקודים לא מעודכן אצלך באפליקציה. נא לעדכנו כעת.", "https://app.netalizer.com/downloads/sch/GazpachoBarcodeScannerPro-1.0.apk")
    }
    console.log(this.barcode);
   
    returnFn(this.barcode['extras']['SCAN_RESULT']);
    // this.barcodeScanner
    //   .scan()
    //   .then((barcodeData) => {
    //     if (!type) returnFn(barcodeData.text);
    //     else if (type && this.checkLength(barcodeData)) {
    //       returnFn(barcodeData.text);
    //     } else {
    //       returnFn(barcodeData.text);
    //       // this.utils.presentalertConfirm(
    //       //   "שימי לב למה שאת סורקת!!! המספר לא תקין.",
    //       //   "בובה!!"
    //       // );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
    //  [1]: https://ion.link/capacitor-differences-with-cordova-docs
    // [2]: https://ion.link/capacitor-using-with-ionic-docs
    // this.zbar
    //   .scan(this.options)
    //   .then((result) => {
    //     console.log();
    //     alert(JSON.stringify(result));
    //     if (type && this.checkNumber(result)) {returnFn(result);
    //     // else if (type && this.checkLength(result)) {
    //     //   returnFn(result);
    //     } else if (!type) {
    //       returnFn(result);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error); // Error message
    //   });
  }
  checkNumber(parallel) {
    let paral = Number(parallel.substring(0, 10));
    // console.log(paral, parallel[1],parallel[3] , parallel[5] , parallel[7] , parallel[9] , parallel[11]  ,
    // parallel[0] , parallel[2] , parallel[4], parallel[6], parallel[8], parallel[10], parallel);
    let check =
      (Number(parallel[1]) +
        Number(parallel[3]) +
        Number(parallel[5]) +
        Number(parallel[7]) +
        Number(parallel[9]) +
        Number(parallel[11])) *
        3 +
      (Number(parallel[0]) +
        Number(parallel[2]) +
        Number(parallel[4]) +
        Number(parallel[6]) +
        Number(parallel[8]) +
        Number(parallel[10]));

    // console.log(check);

    var quotient = Math.floor(check / 10);
    var remainder = check % 10;

    console.log(10 - remainder);
    if (10 - remainder == Number(parallel[12])) {
      return true;
    } else {
      return false;
    }
  }
  checkLength(str) {
    if (str.length == 13) return true;
    return false;
  }
}
