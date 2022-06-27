import { Router } from "@angular/router";
import { UtilsService } from "./../../services/utils/utils.service";
import { SalesFunctionsService } from "./../../services/sales/salesFunctions.service";
import { BarcodeService } from "./../../services/global/barcode.service";
import { Platform } from "@ionic/angular";

import { Component, OnInit } from "@angular/core";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ProductsService } from "../../services/db/webDb/product/products.service";
// import * as ScanditSDK from "scandit-sdk";
// import { Barcode, ScanSettings } from "scandit-sdk-angular";
@Component({
  selector: "app-sale-without",
  templateUrl: "./sale-without.page.html",
  styleUrls: ["./sale-without.page.scss"],
})
export class SaleWithoutPage implements OnInit {
  // ScanditSDK = require("scandit-sdk");
  productId: string = "1001012891234";
  parallel: string;
  product: any;
  public isValid: boolean = true;
  products: Array<object> = [];
  // public settings = new ScanSettings({
  //   enabledSymbologies: [Barcode.Symbology.EAN13],
  // });
  constructor(
    // private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public productDB: ProductsService,
    public barcodeService: BarcodeService,
    public salesFunction: SalesFunctionsService,
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

  async onScan(event) {
    // await ScanditSDK.configure("AfwvfVfBSPCHEAeHvkDFEhYllu3KGapcO3Q18AVpiimmUYOarH9ofGkARvcxXIeSbFDV5Wh1n8FweiTKPHWXM/gdBOZ/fugqFBEL4MR9QZBveIUzRDiNKEdm4hiiSJhhSnRd3YB9IcPVb5hqxED9lrxciISgKMVGUSlJRxZ2dZ8bSsgariOdNJFJo7tqZAirVVjydYtbVCtFehQ7EXjNVE5bgxp4Ulznf09IFK5L3OB7elcrVUqhovtPu5wmVRMVLi0gFpZyY/+0T2i8SkNYTKMgZAnMZ7MhXlRRcY13+v8aZ/C2m08WxBdXqWuKSVoxz2rtdjR7Fh4aY9aPtUNoQ+IS1DzWZI0v9HRcha9JqBVAWzBN10/Ju3h8CTeNY5abZmXcfdMtD+J5SRSV9GTAmXEqBojwJTleQSAX+T5DXUw+RWuIbmj0SH4mStpBatzPO2AtrEZB7dk/FoZ6eFNOR6ZtunxkRxm/SEhMbPRQ7kbHZ+qKjGhIZThkCK4takjkqzW7oVo4yuRrLIrn1j5G/6ed05HvGHGTHmtSqg4EiRC6VFCpUD84NJqVwui3EtDk7VxlzRoe/aP+vZ/CRbBO5OiKLOexjj2oMQmkGx/eRDzPG/LP9oZbAinYYpbJEIKxNuw4bS0G0nDVaKuqHfnwKoPoYsj20oEk7sUqYFwQLJz8BmF6vpnRh0YySTgFywYF4UGip7YPMU36ayvpBuY8rbujR4U4r+co3/0o73lKs0Opb77ow1lSfewYZjcDIvSRK1GM9DzSriRhYeeKFnGsjHaVlIWiCjSWEM5TECNefnHSxNCh1e6b62rhl7UXX1Om7iHYNhQCe3bB5J0p0Wew6IMD6LkXoIMR+vnuRrVmphIzDZ7mjqKOMzZaydi6XC9yA/qdWGCFHgOVNx+PvZbUUtrh+CbXDcC8eLi9MZJ6X1gO3HGt5wBf02HgtCndHG+9FPORPclLQheXj+MXFHdSC98CkNKIx4Aqs9mbrMZfmYCDCJoZ4Zu73++widdsOcUaPPBh8antWJ7Ov8M+TA+qqnS28ANBhmg+ISj0YG42Quo22q10hqlx+UOkezRSDf37SlTecv/yBGyAslSb3a3LJoMXk6BUjzH7QXr8/Y5BWGOh6yxz6z1GBzqmN09WhN4XRCdBylGKWHY0/5HeUqJ6zBVL3nh1ZJXEQQCk7Xinwypwul6HW6EThaxWIfhvXiQ=", {
    //   engineLocation: "build/",
    // });
    // ... ready to instantiate a BarcodePicker or Scanner from here
    alert(JSON.stringify(event));
  }

  onError(event) {
    alert(JSON.stringify(event));
  }
  getProductDetails = async (productId) => {
    this.parallel = productId;
    let result = await this.productDB.getProductByMATNR(
      productId.substring(1, 7)
    );
    console.log(result);
    if (result) {
      this.product = result;
      if (this.product) {
        this.product["parallel"] = this.parallel;
      }
      this.products.push(this.product);
    }
  };

  onSubmit() {
    this.isValid = false;
    if (this.products.length == 0) {
      this.utilsService.presentToast("רשימת המוצרים במכירה זו ריקה!");
      this.router.navigate(["/home"]);
    } else this.salesFunction.saleToDb(this.products, 0);
  }
}
