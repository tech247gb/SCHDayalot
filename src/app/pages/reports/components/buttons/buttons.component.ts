import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
})
export class ButtonsComponent implements OnInit {
  isGuerlain;
  constructor(public router: Router) {}

  ngOnInit() {
    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    }
  }
  onSubmitShifts() {
    this.router.navigate(["/shifts-reports"]);
  }
}
