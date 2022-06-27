import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportDetailsComponent } from "./report-details.component";
import { ComponentsModule } from "../../../../../components/components.module";

@NgModule({
  declarations: [ReportDetailsComponent],
  imports: [CommonModule, ComponentsModule],
})
export class ReportDetailsModule {}
