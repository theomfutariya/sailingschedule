import { Component } from '@angular/core';
import { ApiserviceService } from './api.service';
import { FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'om';
  countries: any;
  countryGroup: any;
  schedules: any;
  p: number = 1;

  constructor(private _apiservice: ApiserviceService) {
    this.countries = [];
    this.schedules = [];
    this.countryGroup = new FormGroup({});
  }

  country1: any;
  country2: any;
  getCountry(from: any, to: any) {
    this.country1 = from;
    this.country2 = to;
    
    this._apiservice.getScheduleData(from, to).subscribe((res => {
      this.schedules = res;
    }),
    error => {
      this.schedules = [];
      this.title = "No sailing schedules are available."
    }
    )
  }
  
  fileName = 'Sailing_Schedules.xlsx';
  exportexcel(): void {
    let e = document.getElementById('schedulesTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(e);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schedules');
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnInit(): void {
    this._apiservice.getCountryData().subscribe(res => {
      this.countries = res;  
    }),
    this.title = "PLease select the countries."
      
  }
  
  id: any;
  search() {
    if (this.id == "") {      
      this.getCountry(this.country1, this.country2);
    } else {
      this.schedules = this.schedules.filter((res: any) => {
        return res.id.toLocaleUpperCase().match(this.id.toLocaleUpperCase());
      })
    }
  }

  vesselName: any;
  searchV() {
    if (this.vesselName == "") {      
      this.getCountry(this.country1, this.country2);
    } else {
      this.schedules = this.schedules.filter((res: any) => {
        return res.vessel.name.toLocaleUpperCase().match(this.vesselName.toLocaleUpperCase());
      })
    }
  }

  voyageNumber: any;
  searchVo() {
    if (this.voyageNumber == "") {      
      this.getCountry(this.country1, this.country2);
    } else {
      this.schedules = this.schedules.filter((res: any) => {
        return res.voyageNumber.toLocaleUpperCase().match(this.voyageNumber.toLocaleUpperCase());
      })
    }
  }

  key = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key);

  }
}
