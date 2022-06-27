import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { AutoCompleteService } from "ionic4-auto-complete";
import { SettingsService } from "./settings.service";

@Injectable()
export class SimpleService implements AutoCompleteService {
  labelAttribute = "FirstName";

  private countries: any[] = [];

  constructor(private http: HttpClient, public setting: SettingsService) {}

  getResults1(keyword: string): Observable<any[]> {
    let observable: Observable<any>;

    if (this.countries.length === 0) {
      observable = this.http.get(
        this.setting.globalServerURL + "crm/getMemberships?dayelet=1600"

        //   observable = this.http.get("https://restcountries.eu/rest/v2/all");
      );
    } else {
      observable = of(this.countries);
    }

    return observable.pipe(
      map((result) => {
        return result.filter((item) => {
          return item.TelephoneNumber.toLowerCase().startsWith(
            keyword.toLowerCase()
          );
        });
      })
    );
  }


  getResults(){

  } 
}
