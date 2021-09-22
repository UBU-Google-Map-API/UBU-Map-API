import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  invalidLogin = false;
  massage:any;
  // formBuilder: any;
  
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private authService: AuthService,
    private location: Location
    ) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
    // console.log(this.loginForm);
    
    // this.loginForm = this.formBuilder.group({
    //   username: ['',Validators.required],
    //   password: ['',Validators.required]
    // });
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", []),
      password: new FormControl("", [
        Validators.required,
        // Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe();
  }
  back(): void {
    this.location.back()
  }
}
