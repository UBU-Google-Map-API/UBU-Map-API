import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required,]),
    roles: new FormControl("", [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  role: any = ['super-admin', 'Author']

  ngOnInit(): void {
    // this.signupForm = this.createFormGroup();
  }

  // createFormGroup(): FormGroup {
  //   return new FormGroup({
  //     name: new FormControl("", [Validators.required, Validators.minLength(2)]),
  //     username: new FormControl("", [Validators.required]),
  //     password: new FormControl("", [Validators.required,
  //       // Validators.minLength(7),
  //     ]),
  //     roles: new FormControl("", [Validators.required])
  //   });
  // }

  signup(): void {
    // console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      this.location.back();
      // this.router.navigate(["login"]);
    });
  }

  back(): void {
    this.location.back()
  }

}
