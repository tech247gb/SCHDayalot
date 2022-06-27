import { SalesFunctionsService } from "./../../services/sales/salesFunctions.service";
import { BarcodeService } from "./../../services/global/barcode.service";
import { Platform } from "@ionic/angular";

import { Component, OnInit } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ProductsService } from "../../services/db/webDb/product/products.service";
import { UtilsService } from "../../services/utils/utils.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-return",
  templateUrl: "./return.page.html",
  styleUrls: ["./return.page.scss"]
})
export class ReturnPage implements OnInit {
  productId: string = "1121849891234";
  parallel: string;
  product: any;
  products: Array<object> = [];
  constructor(
    // private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public productDB: ProductsService,
    public barcodeService: BarcodeService,
    public salesFunctionsService: SalesFunctionsService,
    public utilsService: UtilsService,
    public router: Router
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
    this.parallel = productId;
    let result = await this.productDB.getProductByMATNR(
      productId.substring(1, 7)
    );
    this.product = result;
    this.product["parallel"] = this.parallel;
    this.products.push(this.product);
  };

  onSubmit() {
    if (this.products.length == 0) {
      this.utilsService.presentToast("רשימת המוצרים בהחזרה זו ריקה!");
      this.router.navigate(["/home"]);
    } else this.salesFunctionsService.saleToDb(this.products, 1);    
  }
}
