import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalFnService {
  constructor() {}

  cutZero(num) {
    while (num[0] == "0") {
      num = num.substr(1);
    }
    return num;
  }
}
