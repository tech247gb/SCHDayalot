import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-customer-line",
  templateUrl: "./customer-line.component.html",
  styleUrls: ["./customer-line.component.css"],
})
export class CustomerLineComponent implements OnInit {
  @Input() customer;
  constructor() {}

  ngOnInit() {
  }
}
