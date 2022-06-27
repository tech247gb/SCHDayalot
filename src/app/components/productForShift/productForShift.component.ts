import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-productForShift",
  templateUrl: "./productForShift.component.html",
  styleUrls: ["./productForShift.component.scss"],
})
export class ProductForShiftComponent implements OnInit {
  @Input() product;
  @Input() parallel;
  @Input() type = 1;
  @Input() sales;
  saleAmount = 0;

  constructor() {}

  ngOnInit() {
    this.calculateAmount();
  }

  calculateAmount() {
    this.saleAmount = 0;
    this.sales.map((sale) => {
      sale.salesorderdetailList.map((product) => {
        if (sale.actionType == "0") {
          this.saleAmount += Number(product.price);
        }
        if (sale.actionType == "1") {
          this.saleAmount -= Number(product.price);
        }
      });
    });
    this.saleAmount = Number(String(this.saleAmount).split(".")[0]);
  }
}
