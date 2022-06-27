import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/db/webDb/product/products.service";

@Component({
  selector: "app-product-info-number",
  templateUrl: "./product-info-number.page.html",
  styleUrls: ["./product-info-number.page.scss"],
})
export class ProductInfoNumberPage implements OnInit {
  productId: string = "1001036891234";
  parallel: string;
  product;
  productNum;
  productNumStr = "";

  constructor(public productDB: ProductsService) {}

  ngOnInit() {
    this.productNum = null;
    this.product = null;
  }

  getProductDetails = async (productId) => {
    this.productNumStr = String(this.productNum);
    for (
      let index = this.productNumStr.length;
      this.productNumStr.length < 6;
      index++
    ) {
      this.productNumStr = "0" + this.productNumStr;
    }
    let result = await this.productDB.getProductByMATNR(this.productNumStr);
    this.product = result;
    this.product["parallel"] = productId;
  };

  anotherSearch() {
    this.productNum = null;
    this.product = null;
  }
}
