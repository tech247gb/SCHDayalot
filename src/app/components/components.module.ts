import { IonicModule } from "@ionic/angular";

import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { UserHeaderComponent } from "./user-header/user-header.component";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { Network } from "@ionic-native/network/ngx";
import { ProductForShiftComponent } from "./productForShift/productForShift.component";

@NgModule({
  declarations: [
    HeaderComponent,
    UserHeaderComponent,
    ProductComponent,
    ProductListComponent,
    ProductForShiftComponent
  ],
  imports: [IonicModule, CommonModule],
  providers: [Network],
  exports: [
    HeaderComponent,
    UserHeaderComponent,
    ProductComponent,
    ProductListComponent,
    ProductForShiftComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
