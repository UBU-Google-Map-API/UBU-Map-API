import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
      // console.log(this.authService.isUserLoggedIn$.value);
      // console.log('roles',this.authService.roles);
      // console.log("access denied");
      this.router.navigate(["/"]);
    }
    else {
      // console.log(this.authService.isUserLoggedIn$.value);
      // console.log('roles',this.authService.roles);
      // console.log("access granted");

    }
    return this.authService.isUserLoggedIn$;
  }
}
