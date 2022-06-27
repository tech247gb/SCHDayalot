import { UtilsService } from "./../../../../services/utils/utils.service";
import { ApiService } from "./../../../../services/api.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
})
export class ButtonsComponent implements OnInit {
  inShift: boolean;
  isGuerlain;

  constructor(
    public router: Router,
    public api: ApiService,
    public utils: UtilsService
  ) {
    this.api.inShiftB.subscribe((value) => {
      this.inShift = value;
    });

    this.api.userConnect.subscribe(() => {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    });
  }

  ngOnInit() {
    if (localStorage.dayelet) {
      this.isGuerlain = JSON.parse(localStorage.dayelet)["Zauve"];
    }
  }

  sale_without() {
    if (this.inShift) this.router.navigate(["/sale-without"]);
    else this.utils.presentToast("מצטערת! לא ניתן למכור מחוץ למשמרת.");
  }

  add_member() {
    // if (this.inShift)
    this.router.navigate(["/add-member"]);
    // else this.utils.presentToast("מצטערת! לא ניתן להוסיף לקוח מחוץ למשמרת.");
  }
}
