import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ProductComponent } from "../../../../../components/product/product.component";

@Component({
  selector: "app-report-details",
  templateUrl: "./report-details.component.html",
  styleUrls: ["./report-details.component.scss"],
})
export class ReportDetailsComponent implements OnInit {
  @Input() shift;
  status = 1;
  isGuerlain;
  currentProduct = null;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log("shift: ", this.shift.customers);
    if (!this.shift.sales) {
      this.status = 2;
    }
    if (!this.shift.returns) {
      this.status = 3;
    }

    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    }
  }

  setStatus(status) {
    this.status = status;
  }

  async showProductDetails(product) {
    this.currentProduct = product;
  }

  removeProduct() {
    this.currentProduct = null;

    console.log("product : ", this.currentProduct);
  }
}
