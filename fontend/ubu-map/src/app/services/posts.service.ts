import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = "http://202.28.49.95:3000";
  // private url = "http://localhost:3000";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient,
    private router: Router,) { }

  PostHome(FormData) {
    return this.http.post(`${this.url}/post`, FormData)
  }

  getPostData(name){
    return this.http.get(`${this.url}/post/${name}`)
  }
  
  updatePost(name,FormData){
    return this.http.put(`${this.url}/post/${name}`,FormData)
  } 
  

  deletePost(name){
    return this.http.delete(`${this.url}/post/${name}`)
  }
}
