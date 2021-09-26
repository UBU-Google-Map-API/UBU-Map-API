import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  datafil:string;
  private url = "http://202.28.49.95:3000";
  // private url = "http://localhost:3000";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  public getAllUser() {
    return this.http.get(this.url + "/users");
  }

  public getRolesUser() {
    return this.http.get(this.url + "/users/role");
  }

  public updateUser(id,FormData){
    return this.http.put(`${this.url}/users/${id}`,FormData)
  } 

  public deleteUser(id){
    return this.http.delete(`${this.url}/users/${id}`)
  }
}
