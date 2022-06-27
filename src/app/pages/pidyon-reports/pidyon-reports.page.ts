import { Component, OnInit } from "@angular/core";
import { reportsAPIService } from "../../services/db/webDb/reports/report.service";

@Component({
  selector: "app-pidyon-reports",
  templateUrl: "./pidyon-reports.page.html",
  styleUrls: ["./pidyon-reports.page.scss"],
})
export class PidyonReportsPage implements OnInit {
  graphWidth = "82.1%";
  graphWidthNum = 52;
  radioBT = "b1";
  isLoad: boolean = false;
  constructor(public ReportsAPIService: reportsAPIService) { }

  // detailsDayelet = [
  //   {
  //     name: "ערוצי",
  //     amount: "15,652",
  //     percent: 22.1,
  //   },
  //   {
  //     name: "בישום",
  //     amount: "56,125",
  //     percent: 50.0,
  //   },
  //   {
  //     name: "פדיון",
  //     amount: "63,884",
  //     percent: 97.2,
  //   },
  // ];
  detailsDayelet;
  dayeletPiryon;
  stores = [];
  d = new Date();
  currentMonth = this.d.getMonth() + 1;
  currentYear = this.d.getFullYear();

  ngOnInit() {
    this.getPidyonReports();
  }

  async getPidyonReports() {
    localStorage.pidyonReport = JSON.stringify(true);
    this.dayeletPiryon = await this.ReportsAPIService.getDayeletPiryons();
    this.detailsDayelet = await this.ReportsAPIService.getPidyonReport();
    this.updateDetailsStore();
  }

  radioChange(status) {
    this.radioBT = status;
  }

  updateDetailsStore() {
    for (let index = 0; index < this.detailsDayelet.length; index++) {

      // if (this.detailsDayelet[index]["ZDAYELET__0JOB_T"] === "דיילת רבלון") {
      if (this.detailsDayelet[index]["ZDAYELET__0JOB"] === "60101166") {
        let detailsStore = [
          {
            name: "רבלון",
          },
          {
            name: "נטרוג'ינה",
          },
          {
            name: "קירינס",
          },
          {
            name: "-417",
          },
          {
            name: "בישום 1",
          },
          {
            name: "בישום 2",
          },
          {
            name: "פריון חנות",
          },
        ];
        // detailsStore[0]["name"] = this.detailsDayelet[index]["ZDAYELET__0JOB_T"];
        detailsStore[0]["name"] = "דיילת רבלון";

        let params4 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHLXBL_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHLR01_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHMMLT_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHM9YP_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHM3N5_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHMGA9_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9CSYXB3K0ZD_F"],
        };

        let params5 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHMZ8X_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHMSXD_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHNOJ5_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHNBW1_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHN5KH_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHNI7L_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9CSYXB3K7AX_F"],
        };

        let params6 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHO169_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHNUUP_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHOQGH_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHODTD_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHO7HT_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW077T2STHOK4X_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9CSYXB3KDMH_F"],
        };

        let params10 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSWYY9_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSWSMP_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSXO8H_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSXBLD_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSXHWX_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGWAQ1OGHVSX59T_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9CSYXB3KJY1_F"],
        };

        let params7 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6BG8H_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6B9WX_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6C5IP_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6BSVL_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6BMK1_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6BZ75_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9BQLZ61OPO9_F"],
        };
        let params8 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6CI5T_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6CBU9_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6D7G1_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6CUSX_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6COHD_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW4NMC2XH6D14H_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9BYEUXY0UM1_F"],
        };
        let params9 = {
          p1: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNU8DT_F"],
          p2: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNU229_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNUXO1_F"],
          p4: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNUL0X_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNUEPD_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGW64DLX3LNURCH_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGZD9CSYXB3KQ9L_F"],

        };


        detailsStore[0]["params"] = params4;
        console.log(detailsStore[0]);
        detailsStore[1]["params"] = params5;
        console.log(detailsStore[1]);
        detailsStore[2]["params"] = params6;
        detailsStore[3]["params"] = params10;
        console.log(detailsStore[2]);
        detailsStore[4]["params"] = params7;
        console.log(detailsStore[3]);
        detailsStore[5]["params"] = params8;
        detailsStore[6]["params"] = params9;
        console.log(detailsStore[5]);
        console.log(detailsStore);
        detailsStore["radioBT"] = "b1";
        this.stores.push(detailsStore);


      } else {
        let detailsStore = [
          {
            name: "גרלן",
          },
          {
            name: "בישום 1",
          },
          {
            name: "בישום 2",
          },
          {
            name: "פריון חנות",
          },
        ];
        detailsStore[0]["name"] = this.detailsDayelet[index]["ZDAYELET__0JOB_T"];
        let params0 = {
          // p1: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37JX0T_F"],
          // p2: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37JQP9_F"],
          // p3: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37KMB1_F"],
          // p4: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37K9NX_F"],
          // p5: this.detailsDayelet[index]["A00O2TQU3MOHGZDP1JK2FDDAT5_F"],
          // p6: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37KFZH_F"],
          // p7: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37K3CD_F"],

          p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UXWIW_F"],
          p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UXQ7C_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZBE3EVC99C_F"],
          p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UY2UG_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGZECW5DDBYNJLL_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04VE0OCYONVK_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGS04V8PON5GI5C_F"],
        };

        let params1 = {
          // p1: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37KYY5_F"],
          // p2: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37KSML_F"],
          // p3: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37LO8D_F"],
          // p4: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37LBL9_F"],
          // p5: this.detailsDayelet[index]["A00O2TQU3MOHGZDP1JK2FDDH4P_F"],
          // p6: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37LHWT_F"],
          // p7: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37L59P_F"],

          p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYFHK_F"],
          p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UY960_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZE887DQN6O_F"],
          p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYLT4_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGZECW5DDBYNPX5_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAXF4W_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAX8TC_F"],

        };

        let params2 = {
          // p1: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37M0VH_F"],
          // p2: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37LUJX_F"],
          // p3: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37MQ5P_F"],
          // p4: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37MDIL_F"],
          // p5: this.detailsDayelet[index]["A00O2TQU3MOHGZDP1JK2FDDNG9_F"],
          // p6: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37MJU5_F"],
          // p7: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37M771_F"],

          p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYYG8_F"],
          p2: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYI95_F"],
          p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZE887DQTI8_F"],
          p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UZ4RS_F"],
          p5: this.detailsDayelet[index]["A00O2TQU3MOHGZECW5DDBYNW8P_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KM5EO_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAXLGG_F"],

        };

        let params3 = {
          // p1: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37N2ST_F"],
          // p2: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37MWH9_F"],
          // p3: 0, //this.detailsDayelet["A00O2TQU3MOHGS04ZBE3EVC99C"],
          // p4: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37NFFX_F"],
          // p5: this.detailsDayelet[index]["A00O2TQU3MOHGZDP1LACYM7X15_F"],
          // p6: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37NLRH_F"],
          // p7: this.detailsDayelet[index]["A00O2TNLHJK0DZ0P8PCM37N94D_F"],

          p1: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYOKP_F"],
          p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYS4O_F"],
          p3: 0, //this.detailsDayelet["A00O2TQU3MOHGS04ZBE3EVC99C"],
          p4: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYUW9_F"],
          p5: 0,// this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KMBQ8_F"],
          p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KMI1S_F"],
          p7: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KMBQ8_F"],
        };
        detailsStore[0]["params"] = params0;
        detailsStore[1]["params"] = params1;
        detailsStore[2]["params"] = params2;
        detailsStore[3]["params"] = params3;
        detailsStore["radioBT"] = "b1";
        this.stores.push(detailsStore);

      }

    }
    this.isLoad = true;
  }
}
// import { Component, OnInit } from "@angular/core";
// import { reportsAPIService } from "../../services/db/webDb/reports/report.service";

// @Component({
//   selector: "app-pidyon-reports",
//   templateUrl: "./pidyon-reports.page.html",
//   styleUrls: ["./pidyon-reports.page.scss"],
// })
// export class PidyonReportsPage implements OnInit {
//   graphWidth = "82.1%";
//   graphWidthNum = 52;
//   radioBT = "b1";
//   isLoad: boolean = false;
//   constructor(public ReportsAPIService: reportsAPIService) { }

//   // detailsDayelet = [
//   //   {
//   //     name: "ערוצי",
//   //     amount: "15,652",
//   //     percent: 22.1,
//   //   },
//   //   {
//   //     name: "בישום",
//   //     amount: "56,125",
//   //     percent: 50.0,
//   //   },
//   //   {
//   //     name: "פדיון",
//   //     amount: "63,884",
//   //     percent: 97.2,
//   //   },
//   // ];
//   detailsDayelet;
//   dayeletPiryon;
//   stores = [];
//   d = new Date();
//   currentMonth = this.d.getMonth() + 1;
//   currentYear = this.d.getFullYear();

//   ngOnInit() {
//     this.getPidyonReports();
//   }

//   async getPidyonReports() {
//     localStorage.pidyonReport = JSON.stringify(true);
//     this.dayeletPiryon = await this.ReportsAPIService.getDayeletPiryons();
//     this.detailsDayelet = await this.ReportsAPIService.getPidyonReport();
//     this.updateDetailsStore();
//   }

//   radioChange(status) {
//     this.radioBT = status;
//   }

//   updateDetailsStore() {
//     for (let index = 0; index < this.detailsDayelet.length; index++) {
//       let detailsStore = [
//         {
//           name: "גרלן",
//         },
//         {
//           name: "בישום 1",
//         },
//         {
//           name: "בישום 2",
//         },
//         {
//           name: "פריון חנות",
//         },
//       ];

//       detailsStore[0]["name"] = this.detailsDayelet[index]["ZDAYELET__0JOB_T"];
//       let params0 = {
//         p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UXWIW_F"],
//         p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UXQ7C_F"],
//         p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZBE3EVC99C_F"],
//         p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UY2UG_F"],
//         p5: this.detailsDayelet[index]["A00O2TQU3MOHGS04V8PON5GI5C_F"],
//         p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04VE0OCYONVK_F"],
//       };

//       let params1 = {
//         p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYFHK_F"],
//         p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UY960_F"],
//         p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZE887DQN6O_F"],
//         p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYLT4_F"],
//         p5: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAX8TC_F"],
//         p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAXF4W_F"],
//       };

//       let params2 = {
//         p1: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYYG8_F"],
//         p2: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYI95_F"],
//         p3: this.detailsDayelet[index]["A00O2TQU3MOHGS04ZE887DQTI8_F"],
//         p4: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UZ4RS_F"],
//         p5: this.detailsDayelet[index]["A00O2TQU3MOHGS04W4Y3VAXLGG_F"],
//         p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KM5EO_F"],
//       };

//       let params3 = {
//         p1: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYOKP_F"],
//         p2: this.detailsDayelet[index]["A00O2TNLHJK0DR3IAOCC0UYS4O_F"],
//         p3: 0, //this.detailsDayelet["A00O2TQU3MOHGS04ZBE3EVC99C"],
//         p4: this.detailsDayelet[index]["A00O2TNLHJK0DRI9KGO1KGYUW9_F"],
//         p5: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KMBQ8_F"],
//         p6: this.detailsDayelet[index]["A00O2TQU3MOHGS04WQKT6KMI1S_F"],
//       };

//       detailsStore[0]["params"] = params0;
//       detailsStore[1]["params"] = params1;
//       detailsStore[2]["params"] = params2;
//       detailsStore[3]["params"] = params3;
//       detailsStore["radioBT"] = "b1";
//       this.stores.push(detailsStore);
//     }
//     this.isLoad = true;
//   }
// }