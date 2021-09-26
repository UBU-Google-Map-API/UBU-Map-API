import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  // private urlfle = "http://localhost:3000";
  private urlfle = "http://202.28.49.95:3000";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  public uploadFile(formData) {
    return this.http.post(this.urlfle+"/single", formData);
  }

  public uploadMultiFile(formData) {
    return this.http.post(this.urlfle+"/file/multipleFile", formData);
  }

  public getFile(Name) {
    return this.http.get(`${this.urlfle}/file/getImage/${Name}`);
  }

  public deleteFile(name) {
    return this.http.delete(`${this.urlfle}/file/deleteImage/${name}`);
  }
  

}
