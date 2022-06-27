import { Router } from "@angular/router";
import { UtilsService } from "./../../../services/utils/utils.service";
import { SalesFunctionsService } from "./../../../services/sales/salesFunctions.service";
import { BarcodeService } from "./../../../services/global/barcode.service";
import { Component, OnInit } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Platform } from "@ionic/angular";
import { ProductsService } from "../../../services/db/webDb/product/products.service";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.page.html",
  styleUrls: ["./sale.page.scss"],
})
export class SalePage implements OnInit {
  public inShift: boolean;
  productId: string = "1120386234";
  parallel: string;
  product: any;
  products: Array<object> = [];
  currentCustomer: object = {};

  constructor(
    public platform: Platform,
    public productDB: ProductsService,
    public barcodeService: BarcodeService,
    public salesFunctionsService: SalesFunctionsService,
    public utilsService: UtilsService,
    public router: Router,
    public api: ApiService
  ) {
    this.api.inShiftB.subscribe((value) => {
      this.inShift = Boolean(value);
    });

    if (localStorage.currentCustomer) {
      this.currentCustomer = JSON.parse(localStorage.currentCustomer);
    }
  }

  ngOnInit() {}

  openBarCode() {
    if (!this.platform.is("cordova")) {
      this.getProductDetails(this.productId);
    } else {
      this.barcodeService.scanBarcode(this.getProductDetails, 1);
    }
  }

  getProductDetails = async (productId) => {
    this.parallel = productId;
    let result = await this.productDB.getProductByMATNR(
      productId.substring(1, 7)
    );
    this.product = result;
    this.product["parallel"] = this.parallel;
    this.products.push(this.product);
  };

  async onSubmit() {
    if (this.products.length == 0) {
      this.utilsService.presentToast("רשימת המוצרים במכירה זו ריקה!");
      this.router.navigate(["/customer-club/edit"]);
    } else if (localStorage.shiftId ) {
      await this.salesFunctionsService.saleToDb(
        this.products,
        0,
        this.currentCustomer["Contact_id"]
      );

      this.products = [];
      this.router.navigate(["/customer-club/edit"]);
    } else {
      this.utilsService.presentToast("מצטערת! לא ניתן למכור מחוץ למשמרת");
    }
  }
}
