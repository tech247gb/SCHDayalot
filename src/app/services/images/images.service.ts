import { Injectable } from "@angular/core";
import { Zip } from "@ionic-native/zip/ngx";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  constructor(private zip: Zip) {
    console.log("Images");
  }

  getImages(url) {
    console.log("Images");
    this.zip
      .unzip(
        "http://dysch.sch.co.il:5000/images/getImages",
        "./assets",
        (progress) =>
          alert(
            "Unzipping, " +
              Math.round((progress.loaded / progress.total) * 100) +
              "%"
          )
      )
      .then((result) => {
        console.log(result);
        alert(JSON.stringify(result));
        if (result === 0) alert("SUCCESS");
        if (result === -1) alert("FAILED");
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });

    this.zip
      .unzip("http://dysch.sch.co.il:5000/images/getImages", "", (progress) =>
        alert(
          "Unzipping, " +
            Math.round((progress.loaded / progress.total) * 100) +
            "%"
        )
      )
      .then((result) => {
        alert(JSON.stringify(result));
        if (result === 0) alert("SUCCESS");
        if (result === -1) alert("FAILED");
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });

    this.zip
      .unzip("http://dysch.sch.co.il:5000/images/getImages", "./", (progress) =>
        alert(
          "Unzipping, " +
            Math.round((progress.loaded / progress.total) * 100) +
            "%"
        )
      )
      .then((result) => {
        alert(JSON.stringify(result));
        if (result === 0) alert("SUCCESS");
        if (result === -1) alert("FAILED");
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }
}
