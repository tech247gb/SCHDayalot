import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PidyonReportsPageRoutingModule } from './pidyon-reports-routing.module';

import { PidyonReportsPage } from './pidyon-reports.page';
import { ComponentsModule } from '../../components/components.module';
import { RowPidyonComponent } from './row-pidyon/row-pidyon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PidyonReportsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PidyonReportsPage, RowPidyonComponent,]
})
export class PidyonReportsPageModule {}
