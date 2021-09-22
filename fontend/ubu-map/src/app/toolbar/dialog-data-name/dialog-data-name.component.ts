import { Component, OnInit } from '@angular/core';
import { MapmakerService } from 'src/app/services/mapmaker.service';


export interface DATA {
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
  selector: 'app-dialog-data-name',
  templateUrl: './dialog-data-name.component.html',
  styleUrls: ['./dialog-data-name.component.css']
})
export class DialogDataNameComponent implements OnInit {
  dataSource:any;
  constructor(public mapmakerService: MapmakerService,) { }

  ngOnInit(): void {
    this.mapmakerService.getAllMap().subscribe((resp: any) => {
      this.dataSource = resp;
      // console.log(this.dataSource);
      
    }, (err) => {
      console.log(err);
    })
  }

  
}
