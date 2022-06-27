import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerClubPageRoutingModule } from './customer-club-routing.module';

import { CustomerClubPage } from './customer-club.page';
import { ComponentsModule } from '../../components/components.module';
import { ComponentsClubModule } from './components/componentsClub.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerClubPageRoutingModule,
    ComponentsModule,
    ComponentsClubModule
  ],
  declarations: [CustomerClubPage]
})
export class CustomerClubPageModule {}
