import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient) { }

  getCountryData() {
    return this._http.get('https://apitest.ecuworldwide.com/codes/countries');
  };  

  getScheduleData(source: string, destination: string) {
    return this._http.get('https://apitest.ecuworldwide.com/schedules', {
      params: { from: source, to: destination },
    });
  }
}