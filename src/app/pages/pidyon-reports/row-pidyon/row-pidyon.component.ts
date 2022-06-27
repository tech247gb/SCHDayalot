import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-row-pidyon",
  templateUrl: "./row-pidyon.component.html",
  styleUrls: ["./row-pidyon.component.css"],
})
export class RowPidyonComponent implements OnInit {
  @Input() rowDetails;
  @Input() radioBT;
  constructor() {}

  ngOnInit() {
  }
}
