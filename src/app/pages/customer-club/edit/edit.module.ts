import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditPageRoutingModule } from "./edit-routing.module";

import { EditPage } from "./edit.page";
import { ComponentsClubModule } from "../components/componentsClub.module";
import { ProfilePageModule } from "../profile/profile.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ComponentsClubModule,
    ProfilePageModule
  ],
  declarations: [EditPage, ]
})
export class EditPageModule {}
