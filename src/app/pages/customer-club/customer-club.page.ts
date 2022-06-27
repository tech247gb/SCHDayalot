import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer-club",
  templateUrl: "./customer-club.page.html",
  styleUrls: ["./customer-club.page.scss"]
})
export class CustomerClubPage implements OnInit {
  currentCustomer: object = {};
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (localStorage.currentCustomer) {
      this.currentCustomer = JSON.parse(localStorage.currentCustomer);
    }
  }
}
