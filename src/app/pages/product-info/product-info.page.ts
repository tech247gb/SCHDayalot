import { BarcodeService } from "./../../services/global/barcode.service";
import { Platform } from "@ionic/angular";

import { Component, OnInit } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";/
import { ProductsService } from "../../services/db/webDb/product/products.service";
import { UrlqueueService } from "../../services/db/webDb/urlqueue/urlqueue.service";
import { UtilsService } from "../../services/utils/utils.service";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.page.html",
  styleUrls: ["./product-info.page.scss"]
})
export class ProductInfoPage implements OnInit {
  productId: string = "1001036891234";
  parallel: string;
  product;
  constructor(
    // private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public productDB: ProductsService,
    public urlDB: UrlqueueService,
    public utils: UtilsService,
    public barcodeService: BarcodeService
  ) {}

  ngOnInit() {
    this.openBarCode();
  }

  openBarCode() {
    if (!this.platform.is("cordova")) {
      this.getProductDetails(this.productId);
    } else {
      this.barcodeService.scanBarcode(this.getProductDetails, 1);
    }
  }

  getProductDetails = async productId => {
    let result = await this.productDB.getProductByMATNR(
      productId.substring(1, 7)
    );
    this.product = result;
    this.product["parallel"] = productId;
  };
  async apiRun(){
   await this.urlDB.apiCallList();

  }
}
