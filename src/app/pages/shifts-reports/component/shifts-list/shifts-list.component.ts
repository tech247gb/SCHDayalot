import { SaleItemsService } from "./../../../../services/db/webDb/sales/saleItems/saleItems.service";
import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  ViewChild,
} from "@angular/core";
import { IonContent } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-shifts-list",
  templateUrl: "./shifts-list.component.html",
  styleUrls: ["./shifts-list.component.scss"],
})
export class ShiftsListComponent implements OnInit {
  @Input() shiftsTime;
  // @ViewChildren("scrollElement") content: IonContent;
  @ViewChild("content", { static: false }) content: IonContent;
  scroll: any;
  constructor(public network:Network) {}

  ngOnInit() {
    //  console.log("15", this.shiftsTime);
  }

  shiftClicked(i) {
    //  console.log("Clicked : ", i, this.scroll);
    // this.content.scrollToPoint(0, 700, 1000);
  }

  logScrollStart(event) {
    this.scroll = event;
    //console.log("logScrollStart : When Scroll Starts", event);
  }

  logScrolling(event) {
    this.scroll = event;
    //  console.log("logScrolling : When Scrolling", event.detail.currentY);
  }

  logScrollEnd(event) {
    this.scroll = event;
    // console.log("logScrollEnd : When Scroll Ends", event);
  }
}
