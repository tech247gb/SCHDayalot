import { BarcodeService } from "./../../services/global/barcode.service";
import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Platform, LoadingController } from "@ionic/angular";
import { ProductsService } from "../../services/db/webDb/product/products.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @Input() products;
  @Input() customer;
  @Input() return;

  productId: string = "1001012891234";
  parallel: string;
  product: any;
  constructor(
    public router: Router,
    // private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public productDB: ProductsService,
    public barcodeService: BarcodeService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  deleteItem(i) {
    this.products.splice(i, 1);
  }

  openBarCode() {
    if (!this.platform.is("cordova")) {
      this.getProductDetails(this.productId);
    } else {
      this.barcodeService.scanBarcode(this.getProductDetails, 1);
    }
  }

  getProductDetails = async (productId) => {
    let mainLoader = await this.loadingCtrl.create({ message: "...בטעינה" });
    mainLoader.present();

    try {
      this.parallel = productId;

      let result = await this.productDB.getProductByMATNR(
        productId.substring(1, 7)
      );

      if (result) {
        this.product = result;
        this.product["parallel"] = this.parallel;

        this.products.push(this.product);
      }


      mainLoader.dismiss();
    } catch (err) {
      mainLoader.dismiss();
    }
  };
}
