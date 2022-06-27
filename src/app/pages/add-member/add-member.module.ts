import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMemberPageRoutingModule } from './add-member-routing.module';

import { AddMemberPage } from './add-member.page';
import { ComponentsModule } from '../../components/components.module';
import { MemberFormComponent } from './member-form/member-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMemberPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddMemberPage, MemberFormComponent]
})
export class AddMemberPageModule {}
