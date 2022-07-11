import { SyncAPIService } from './../../services/db/webDb/sync.service';
import { enterShiftModel } from './../../models/shift/enterShift.model';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils/utils.service';
import { ShiftServer } from '../../services/server/shiftServer';
import { exitShiftModel } from '../../models/shift/exitShift.model';
import { StorsService } from '../../services/db/webDb/stors/stors.service';
import { unescapeIdentifier } from '@angular/compiler';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  public dayeletDetails: any = {};
  public customerDetails: any = {};

  enterShiftReport = new enterShiftModel();
  exitShiftReport = new exitShiftModel();

  constructor(
    public api: ApiService,
    public router: Router,
    public shiftServer: ShiftServer,
    public utils: UtilsService,
    public network:Network,
    public storsService: StorsService,
    public async: SyncAPIService
  ) {}

  async enterShift() {
    if( this.network.type!='none'){
      localStorage.currentStor = localStorage.currentStorTemp;
      this.customerDetails = JSON.parse(localStorage.currentStor);
      this.dayeletDetails = JSON.parse(localStorage.dayelet);
      this.enterShiftReport.pernr = this.dayeletDetails.Pernr;
      this.enterShiftReport.vorna = this.dayeletDetails.Vorna;
      this.enterShiftReport.nachn = this.dayeletDetails.Nachn;
      this.enterShiftReport.kunnr = this.customerDetails.Kunnr;
      this.enterShiftReport.kunnrName = this.customerDetails.Name1;
      this.enterShiftReport.superVisor = this.dayeletDetails.Super;
      this.enterShiftReport.date = formatDate(new Date(), 'dd.MM.yyyy', 'en');
      this.enterShiftReport.enterTime = formatDate(new Date(), 'HH:mm:ss', 'en');
      // this.enterShiftReport.date = new Date();
      // this.enterShiftReport.enterTime = new Date();
      this.enterShiftReport.exitTime = '';
      let shiftId = await this.shiftServer.getShiftID();
      localStorage.shiftId = shiftId['saleId'];
      this.enterShiftReport.shiftId = localStorage.shiftId;
      this.enterShiftReport.batteryStatus = this.api.BatteryStatus;
      this.async.getSales();
      // send number 1 to function for enter shift
      let serverResult = await this.shiftServer.sendShiftToServer(
        this.enterShiftReport,
        1
      );
      if (!serverResult) {
        localStorage.inShift = JSON.stringify(true);
        this.api.inShiftB.next(true);
        localStorage.saleNum = 1;
        localStorage.returnNum = 1;
        localStorage.customerNum = 0;
        this.router.navigate(['/home']);
      } else {
        alert('error-'+serverResult['error']+',webapi-'+'dayalotData/setData');
        this.router.navigate(['/home']);
      }
    }else{
      this.utils.presentToast('לא ניתן להתחיל משמרת ללא חיבור לאינטרנט');
      this.router.navigate(['/home']);
    }
    
  }

  async endShift() {
    if(this.network.type!=='none'){
      localStorage.currentStor = localStorage.currentStorTemp;
      this.customerDetails = JSON.parse(localStorage.currentStor);
      this.exitShiftReport.shiftId = localStorage.shiftId;
      this.dayeletDetails = JSON.parse(localStorage.dayelet);
      this.exitShiftReport.pernr = this.dayeletDetails.Pernr;
      this.exitShiftReport.vorna = this.dayeletDetails.Vorna;
      this.exitShiftReport.nachn = this.dayeletDetails.Nachn;
      this.exitShiftReport.kunnr = this.customerDetails.Kunnr;
      this.exitShiftReport.kunnrName = this.customerDetails.Name1;
      // this.exitShiftReport.date = formatDate(new Date(), "dd.MM.yyyy", "en");
      this.exitShiftReport.exitTime = formatDate(new Date(), 'HH:mm:ss', 'en');
      this.exitShiftReport.customerNum = localStorage.customerNum;
      this.exitShiftReport.pidyonReport = localStorage.pidyonReport;
      this.exitShiftReport.batteryStatus = this.api.BatteryStatus;
      // send number 0 to function for end shift
      console.log(JSON.stringify(this.exitShiftReport));
      let serverResult = await this.shiftServer.sendShiftToServer(
        this.exitShiftReport,
        0,
        localStorage.shiftId
      );
      console.log(serverResult);
      if (!serverResult) {
        localStorage.inShift = JSON.stringify(false);
        this.api.inShiftB.next(false);
        localStorage.currentStor = '';
        localStorage.currentStorTemp = '';
        localStorage.pidyonReport = JSON.stringify(false);
        localStorage.shiftId = '';
        localStorage.saleNum = 1;
        localStorage.returnNum = 1;
        this.router.navigate(['/home']);
      }
    }
    else{
      this.utils.presentToast('לא ניתן לסיים משמרת ללא חיבור לאינטרנט');
      this.router.navigate(['/home']);
    }
  }
}
