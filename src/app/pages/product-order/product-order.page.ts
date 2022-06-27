import { BarcodeService } from "./../../services/global/barcode.service";
import { Platform } from "@ionic/angular";

import { Component, OnInit } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-product-order",
  templateUrl: "./product-order.page.html",
  styleUrls: ["./product-order.page.scss"]
})
export class ProductOrderPage implements OnInit {
  productId: string = "1001526218336";
  constructor(
    // private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public barcodeService: BarcodeService
  ) {}

  ngOnInit() {
    this.openBarCode();
  }

  openBarCode() {
    console.log(this.platform);
    if (!this.platform.is("cordova")) {
      this.getProductDetails(this.productId);
    } else {
      this.barcodeService.scanBarcode(this.getProductDetails, 1);
    }
  }

  getProductDetails= async (productId) => {
    console.log("Pid : ", productId);
  }
}
