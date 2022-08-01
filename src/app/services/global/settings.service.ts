import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  // // ***** DEV *****
  // public globalURL: string = "https://80.74.112.219/ecc/";
  // public globalServerURL: string = "https://80.74.112.219:5000/";
  // public branch:string ='dev';


  // ***** QA *****
  // public globalURL: string = "https://80.74.112.220:5000/ecc/";
  // public globalServerURL: string = "https://80.74.112.220:5000/";
  // public branch:string ='qas';

  
  //  public globalURL: string = "https://dysch-dev.sch.co.il:5000/ecc/";
  //  public globalServerURL: string = "https://dysch-dev.sch.co.il:5000/";
  // public branch:string ='qas';

  // ***** PROD *****
  public globalURL: string = "https://80.74.112.215:5000/ecc/";
  public globalServerURL: string = "https://80.74.112.215:5000/";
  public branch:string ='prod';


  // ***** SAND BOX *****
  // public globalURL: string = "https://192.168.101.220:5001/ecc/";
  // public globalServerURL: string = "https://192.168.101.220:5001/";

  // public versionOnServer: string = "1.0.1";
  public currentVersion: string = "2.00";
  public lastAPKurl: string =
    "https://dysch.sch.co.il:5000/dayalotApp/currentVersion?download=true";
  // "https://192.168.101.219:5000//dayalotApp/download=true";
  constructor() { }
}
