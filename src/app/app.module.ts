// import { ZBar } from '@ionic-native/zbar/ngx';
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BatteryStatus } from "@ionic-native/battery-status/ngx";
import { IonicGestureConfig } from "./services/utils/IonicGestureConfig";
import { LongPressModule } from "ionic-long-press";
import { HTTP } from "@ionic-native/http/ngx";
import { Network } from "@ionic-native/network/ngx";
import { Zip } from "@ionic-native/zip/ngx";
import { AppRate } from "@ionic-native/app-rate/ngx";
import { Device } from "@ionic-native/device/ngx";
import { ZBar } from "@ionic-native/zbar/ngx";
import { WebIntent } from "@awesome-cordova-plugins/web-intent/ngx";
import { HttpInterceptor } from './interceptors/http.interceptor';
import { AppUpdate } from "@ionic-native/app-update/ngx";
import { AppVersion } from '@ionic-native/app-version/ngx';

// import { ScanditSdkModule, ScanditSdkServiceConfig } from "scandit-sdk-angular";

// const licenseKey =
//   "AfwvfVfBSPCHEAeHvkDFEhYllu3KGapcO3Q18AVpiimmUYOarH9ofGkARvcxXIeSbFDV5Wh1n8FweiTKPHWXM/gdBOZ/fugqFBEL4MR9QZBveIUzRDiNKEdm4hiiSJhhSnRd3YB9IcPVb5hqxED9lrxciISgKMVGUSlJRxZ2dZ8bSsgariOdNJFJo7tqZAirVVjydYtbVCtFehQ7EXjNVE5bgxp4Ulznf09IFK5L3OB7elcrVUqhovtPu5wmVRMVLi0gFpZyY/+0T2i8SkNYTKMgZAnMZ7MhXlRRcY13+v8aZ/C2m08WxBdXqWuKSVoxz2rtdjR7Fh4aY9aPtUNoQ+IS1DzWZI0v9HRcha9JqBVAWzBN10/Ju3h8CTeNY5abZmXcfdMtD+J5SRSV9GTAmXEqBojwJTleQSAX+T5DXUw+RWuIbmj0SH4mStpBatzPO2AtrEZB7dk/FoZ6eFNOR6ZtunxkRxm/SEhMbPRQ7kbHZ+qKjGhIZThkCK4takjkqzW7oVo4yuRrLIrn1j5G/6ed05HvGHGTHmtSqg4EiRC6VFCpUD84NJqVwui3EtDk7VxlzRoe/aP+vZ/CRbBO5OiKLOexjj2oMQmkGx/eRDzPG/LP9oZbAinYYpbJEIKxNuw4bS0G0nDVaKuqHfnwKoPoYsj20oEk7sUqYFwQLJz8BmF6vpnRh0YySTgFywYF4UGip7YPMU36ayvpBuY8rbujR4U4r+co3/0o73lKs0Opb77ow1lSfewYZjcDIvSRK1GM9DzSriRhYeeKFnGsjHaVlIWiCjSWEM5TECNefnHSxNCh1e6b62rhl7UXX1Om7iHYNhQCe3bB5J0p0Wew6IMD6LkXoIMR+vnuRrVmphIzDZ7mjqKOMzZaydi6XC9yA/qdWGCFHgOVNx+PvZbUUtrh+CbXDcC8eLi9MZJ6X1gO3HGt5wBf02HgtCndHG+9FPORPclLQheXj+MXFHdSC98CkNKIx4Aqs9mbrMZfmYCDCJoZ4Zu73++widdsOcUaPPBh8antWJ7Ov8M+TA+qqnS28ANBhmg+ISj0YG42Quo22q10hqlx+UOkezRSDf37SlTecv/yBGyAslSb3a3LJoMXk6BUjzH7QXr8/Y5BWGOh6yxz6z1GBzqmN09WhN4XRCdBylGKWHY0/5HeUqJ6zBVL3nh1ZJXEQQCk7Xinwypwul6HW6EThaxWIfhvXiQ=";
// const engineLocation = "assets/";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LongPressModule,

    HttpClientModule,
    FormsModule,    // ScanditSdkModule.forRoot(licenseKey, { engineLocation, preloadEngine: true, preloadBlurryRecognition: true })
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    // BarcodeScanner,
    ZBar,
    BatteryStatus,
    Device,
    SQLite,
    Network,
    Zip,
    AppRate,
    WebIntent,
    AppUpdate,
    AppVersion,
    // ScanditSdkServiceConfig,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
