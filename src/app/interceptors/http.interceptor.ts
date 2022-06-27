import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "./../../environments/environment";
import { SettingsService } from "../services/global/settings.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NetworkService } from '../services/server/network.service';
import { UrlqueueService } from '../services/db/webDb/urlqueue/urlqueue.service';
import { Network } from "@ionic-native/network/ngx";


@Injectable()

export class HttpInterceptor implements HttpInterceptor {
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, content-type, Authorization, authorization ",
        "Access-Control-Allow-Origin": "*"
      })
    };
    constructor(public setting: SettingsService,public network:Network,public urlService: UrlqueueService, private http: HttpClient) {}
    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
      request = this.getHeaders(request);
      if(this.network.type=='none' ) {
        return;
      }
      return next.handle(request);
    }
    getHeaders(request: HttpRequest < any > ): HttpRequest < any > {
      // return request;
      console.log('header authorization')
      const now = new Date();
      let tokenData = "";
      // if(localStorage.dayelet && localStorage.dayelet !=="") {
      let localToken = localStorage.token ? JSON.parse(localStorage.token) : '';
      console.log(localToken.value)
      tokenData = localToken && localToken.value ? localToken.value : '';
      console.log(tokenData)
      if (tokenData) {
        console.log('Token exist')
        if (now.getTime() > localToken.expiry) {
          localStorage.removeItem('token')
          console.log('Token expired')
        }        
      }
      let apiName = request.url.split('/')[4];
      if ((!tokenData || tokenData === "") && apiName !== 'login') {
        this.http
          .post(
            this.setting.globalServerURL +
            "user/login", {
              Usrid: environment.Usrid,
              Perid: environment.Perid
            }
          )
          .toPromise()
          .then((res) => {
            console.log(res)
            tokenData = res['token'];
            const item = {
              value: tokenData,
              expiry: now.getTime() + (environment.loginTimeout * 60 * 60 * 1000)
            }
            localStorage.setItem('token', JSON.stringify(item));
            console.log('New token updated')
            if(localStorage.Usrid && localStorage.Pernr) {
                console.log('getDayalot API')
                this.http
                .get(
                    this.setting.globalURL +
                    "getDayalot?pernr=" +
                    localStorage.Pernr +
                    "&usrid=" +
                    localStorage.Usrid  
                )
                .toPromise()
                .then((res) => {
                    console.log('Localstorage removed')
                    localStorage.removeItem('Usrid')
                    localStorage.removeItem('Pernr')
                })
                .catch((err) => console.log("error:", err));
            }
        })
        .catch((err) => console.log("error:", err.status));
      }
      let serverUrlPrefix = (this.setting.globalServerURL).split('/')[2]+'/';
      let requestPrefix = request.url.split('/')[2]+'/'
      if (apiName !== 'login' && serverUrlPrefix === requestPrefix) {
        if(!request.headers.get('Flag') && this.network.type ==='none' && request.method ==='POST' && apiName === 'setData' ){
            let value={
              'url':request.url,
              'request':JSON.stringify(request.body)
            }
            this.urlService.insertUrlToDb(value);
          }
        request = request.clone({
          headers: request.headers.delete('Flag')
        });
        console.log('Setting header')
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenData}`,
          },
        });
      } else {
        return request;
      }
      //}   
    }
  }