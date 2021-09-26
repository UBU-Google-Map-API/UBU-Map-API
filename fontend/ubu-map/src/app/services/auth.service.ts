import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // private url = "http://localhost:3000/auth";
  private url = "http://202.28.49.95:3000";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;
  userLogin;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  roles:any;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signup(user: Omit<User, "id">): Observable<User> {
    // console.log('user', user);
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("signup"))
      );
  }

  singin(user: any) {
    return this.http.post(`${this.url}/user/singin`, user)
  }


  // updatePost(name,FormData){
  //   return this.http.put(`${this.url}/post/${name}`,FormData)
  // } 

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post(`${this.url}/login`, { username, password }, this.httpOptions)
      .pipe(map((user: any) => {
        // console.log('user', user);
        // check Roles
        this.userLogin = user
        if (user.roles == "Author") {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isUserLoggedIn$.next(true);
            this.router.navigate(["/home"]);
            this.roles = user.roles;
            return user;
          }
        }
        else if (user.roles == "super-admin") {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isUserLoggedIn$.next(true);
            this.router.navigate(["/admin"]);
            this.roles = user.roles;
            
            return user;
          }
        }

        // if (user && user.token) {
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   this.currentUserSubject.next(user);
        //   this.isUserLoggedIn$.next(true);
        //   this.router.navigate(["/home"]);
        // }
        return user;
      }));
  }
}