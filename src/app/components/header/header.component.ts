import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() name;

  constructor(public nav: NavController, public router: Router) {}

  ngOnInit() {}

  ionViewWillLeave() {}

  back() {
    this.router.navigate(["/home"]);
  }
}
