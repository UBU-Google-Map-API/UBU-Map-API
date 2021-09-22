import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapmakerService {
  private _messageSource = new Subject<string>();
  Message$ = this._messageSource.asObservable();

  datafil: string;
  data: any;
  
  private url = "http://localhost:3000";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    public getAllMap() {
      return this.http.get(this.url + "/mapmaker");
    }
    public getProvince() {
      return this.http.get(this.url + "/mapmaker/Province");
    }
    public getStatus() {
      return this.http.get(this.url + "/mapmaker/Status");
    }

    public filterdata(filters) {
      this.datafil = filters;
      // console.log('filters',filters);
      // console.log('datafil',this.datafil);
      return this.datafil;
      // return this.http.get(this.url + "/mapmaker").subscribe((res: any) =>{
      //   this.data = res.filter(x => x.Province == filters);
      // });
    }

    sendMessage(message: string) {
      this._messageSource.next(message);
    } 

}
