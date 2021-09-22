import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapmakerService } from '../../app/services/mapmaker.service';
import { AuthService } from '../services/auth.service';
import { DialogDataNameComponent } from './dialog-data-name/dialog-data-name.component';
import { DialogDataComponent } from './dialog-data/dialog-data.component';

export interface DialogData {
  animal: string;
  name: string;
}

export interface data {
  Id: string,
  Name: string,
  Address: string,
  Province: string,
  Status: string,
  Register_date: Date,
  Certificate_date1: Date,
  Certificate_date2: Date,
  Category: string,
  Latitude: string,
  Longitude: string,
  Picture_1: string,
  Picture_2: string,
  Picture_3: string,
  Picture_4: string,
  Picture_5: string,
  Picture_6: string,
  Picture_7: string,
  Picture_8: string,
  Picture_9: string,
  Picture_10: string,
  Vdo: string,
  updated_at: Date,
  created_at: Date
}


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
  getdata: data[];
  selectedValue: string;
  isAuthenticated = false;
  isRole:string;

  Provinces;
  options = ['หน้าแรก', 'โรงเรียน', 'องค์กรปกครองส่วนท้องถิ่น'];
  username: string;
  isHidden: boolean = true;

  constructor(
    public dialog: MatDialog,
    public mapmakerService: MapmakerService,
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.mapmakerService.getProvince().subscribe(data => {
      this.Provinces = data;
    })
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
    this.authService.currentUser.subscribe(user => {
      this.username = user.username;
    })
    this.isRole =  this.authService.roles;
    this.mapmakerService.getAllMap().subscribe((resp: any) => {
      this.getdata = resp;
    }, (err) => {
      console.log(err);
    })
  }

  openDialog() {
    this.dialog.open(DialogDataComponent);
  }

  OnselectedValue(selectedValuedata: any) {
    this.mapmakerService.sendMessage(selectedValuedata);
  }

  onClick(option) {
    this.mapmakerService.sendMessage(option);

  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }

  home(){
    this.router.navigate(["/"]);
  }

  linkAdmin(){
    this.router.navigate(["/admin"]);
  }

  test(Province){
    this.mapmakerService.sendMessage(Province);
  }
}

