import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ComponentsModule } from "../../components/components.module";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { MessageComponent } from "./components/message/message.component";
import { SearchcustComponent } from "./components/searchcust/searchcust.component";
import { AutoCompleteModule } from "ionic4-auto-complete";
import { SimpleService } from "../../services/global/autoCompleteService";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    AutoCompleteModule,
  ],
  declarations: [
    HomePage,
    ButtonsComponent,
    MessagesComponent,
    MessageComponent,
    SearchcustComponent,
  ],
  providers: [SimpleService],
})
export class HomePageModule {}
