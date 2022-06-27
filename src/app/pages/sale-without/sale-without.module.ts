import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SaleWithoutPageRoutingModule } from "./sale-without-routing.module";

import { SaleWithoutPage } from "./sale-without.page";
import { ComponentsModule } from "../../components/components.module";
// import { ScanditSdkModule } from "scandit-sdk-angular";
const licenseKey =
  "AfwvfVfBSPCHEAeHvkDFEhYllu3KGapcO3Q18AVpiimmUYOarH9ofGkARvcxXIeSbFDV5Wh1n8FweiTKPHWXM/gdBOZ/fugqFBEL4MR9QZBveIUzRDiNKEdm4hiiSJhhSnRd3YB9IcPVb5hqxED9lrxciISgKMVGUSlJRxZ2dZ8bSsgariOdNJFJo7tqZAirVVjydYtbVCtFehQ7EXjNVE5bgxp4Ulznf09IFK5L3OB7elcrVUqhovtPu5wmVRMVLi0gFpZyY/+0T2i8SkNYTKMgZAnMZ7MhXlRRcY13+v8aZ/C2m08WxBdXqWuKSVoxz2rtdjR7Fh4aY9aPtUNoQ+IS1DzWZI0v9HRcha9JqBVAWzBN10/Ju3h8CTeNY5abZmXcfdMtD+J5SRSV9GTAmXEqBojwJTleQSAX+T5DXUw+RWuIbmj0SH4mStpBatzPO2AtrEZB7dk/FoZ6eFNOR6ZtunxkRxm/SEhMbPRQ7kbHZ+qKjGhIZThkCK4takjkqzW7oVo4yuRrLIrn1j5G/6ed05HvGHGTHmtSqg4EiRC6VFCpUD84NJqVwui3EtDk7VxlzRoe/aP+vZ/CRbBO5OiKLOexjj2oMQmkGx/eRDzPG/LP9oZbAinYYpbJEIKxNuw4bS0G0nDVaKuqHfnwKoPoYsj20oEk7sUqYFwQLJz8BmF6vpnRh0YySTgFywYF4UGip7YPMU36ayvpBuY8rbujR4U4r+co3/0o73lKs0Opb77ow1lSfewYZjcDIvSRK1GM9DzSriRhYeeKFnGsjHaVlIWiCjSWEM5TECNefnHSxNCh1e6b62rhl7UXX1Om7iHYNhQCe3bB5J0p0Wew6IMD6LkXoIMR+vnuRrVmphIzDZ7mjqKOMzZaydi6XC9yA/qdWGCFHgOVNx+PvZbUUtrh+CbXDcC8eLi9MZJ6X1gO3HGt5wBf02HgtCndHG+9FPORPclLQheXj+MXFHdSC98CkNKIx4Aqs9mbrMZfmYCDCJoZ4Zu73++widdsOcUaPPBh8antWJ7Ov8M+TA+qqnS28ANBhmg+ISj0YG42Quo22q10hqlx+UOkezRSDf37SlTecv/yBGyAslSb3a3LJoMXk6BUjzH7QXr8/Y5BWGOh6yxz6z1GBzqmN09WhN4XRCdBylGKWHY0/5HeUqJ6zBVL3nh1ZJXEQQCk7Xinwypwul6HW6EThaxWIfhvXiQ=";
const engineLocation = "assets/";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleWithoutPageRoutingModule,
    ComponentsModule,
    // ScanditSdkModule.forRoot(
    //   "AfwvfVfBSPCHEAeHvkDFEhYllu3KGapcO3Q18AVpiimmUYOarH9ofGkARvcxXIeSbFDV5Wh1n8FweiTKPHWXM/gdBOZ/fugqFBEL4MR9QZBveIUzRDiNKEdm4hiiSJhhSnRd3YB9IcPVb5hqxED9lrxciISgKMVGUSlJRxZ2dZ8bSsgariOdNJFJo7tqZAirVVjydYtbVCtFehQ7EXjNVE5bgxp4Ulznf09IFK5L3OB7elcrVUqhovtPu5wmVRMVLi0gFpZyY/+0T2i8SkNYTKMgZAnMZ7MhXlRRcY13+v8aZ/C2m08WxBdXqWuKSVoxz2rtdjR7Fh4aY9aPtUNoQ+IS1DzWZI0v9HRcha9JqBVAWzBN10/Ju3h8CTeNY5abZmXcfdMtD+J5SRSV9GTAmXEqBojwJTleQSAX+T5DXUw+RWuIbmj0SH4mStpBatzPO2AtrEZB7dk/FoZ6eFNOR6ZtunxkRxm/SEhMbPRQ7kbHZ+qKjGhIZThkCK4takjkqzW7oVo4yuRrLIrn1j5G/6ed05HvGHGTHmtSqg4EiRC6VFCpUD84NJqVwui3EtDk7VxlzRoe/aP+vZ/CRbBO5OiKLOexjj2oMQmkGx/eRDzPG/LP9oZbAinYYpbJEIKxNuw4bS0G0nDVaKuqHfnwKoPoYsj20oEk7sUqYFwQLJz8BmF6vpnRh0YySTgFywYF4UGip7YPMU36ayvpBuY8rbujR4U4r+co3/0o73lKs0Opb77ow1lSfewYZjcDIvSRK1GM9DzSriRhYeeKFnGsjHaVlIWiCjSWEM5TECNefnHSxNCh1e6b62rhl7UXX1Om7iHYNhQCe3bB5J0p0Wew6IMD6LkXoIMR+vnuRrVmphIzDZ7mjqKOMzZaydi6XC9yA/qdWGCFHgOVNx+PvZbUUtrh+CbXDcC8eLi9MZJ6X1gO3HGt5wBf02HgtCndHG+9FPORPclLQheXj+MXFHdSC98CkNKIx4Aqs9mbrMZfmYCDCJoZ4Zu73++widdsOcUaPPBh8antWJ7Ov8M+TA+qqnS28ANBhmg+ISj0YG42Quo22q10hqlx+UOkezRSDf37SlTecv/yBGyAslSb3a3LJoMXk6BUjzH7QXr8/Y5BWGOh6yxz6z1GBzqmN09WhN4XRCdBylGKWHY0/5HeUqJ6zBVL3nh1ZJXEQQCk7Xinwypwul6HW6EThaxWIfhvXiQ=",
    //   {
    //     engineLocation,
    //     preloadEngine: true,
    //     preloadBlurryRecognition: true,
    //   }
    // ),
  ],
  declarations: [SaleWithoutPage],
})
export class SaleWithoutPageModule {}
