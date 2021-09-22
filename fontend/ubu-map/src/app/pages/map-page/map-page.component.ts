import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MapmakerService } from '../../services/mapmaker.service';
// import { ToolbarComponent } from '../../toolbar/toolbar.component';
@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  datafil: string;
  interval: any;
  lat: number = 15.127603517250721;
  lng: number = 103.77019119469655;
  zoom = 8.5;
  locations: any;
  icon0 = {
    url: './assets/marker/marker-00.png',
    scaledSize: { width: 35, height: 40 }
  };
  icon1 = {
    url: './assets/marker/marker-01.png',
    scaledSize: { width: 35, height: 40 }
  };
  icon2 = {
    url: './assets/marker/marker-02.png',
    scaledSize: { width: 35, height: 40 }
  };
  previous;
  Longitude: any;
  Latitude: any;

  constructor(
    private mapmakerService: MapmakerService,
    private fileuploadService:FileUploadService,
    ) { }

  public ngOnInit(): void {
    this.getMapmaket();
  }

  getMapmaket() {
    this.mapmakerService.getAllMap().subscribe((resp: any) => {
      this.locations = resp;
    }, (err) => {
      console.log(err);
    })

    this.mapmakerService.Message$.subscribe(message => {
      // console.log('message', message);

      this.mapmakerService.getAllMap().subscribe((resp: any) => {
        this.locations = resp.filter(x => x.Province == message);
      })

      if(message === 'องค์กรปกครองส่วนท้องถิ่น'){
        this.mapmakerService.getAllMap().subscribe((resp: any) => {
          this.locations = resp.filter(c => c.Category == 'องค์การบริหารส่วนตําบล');
        })
      }
      else if(message === 'โรงเรียน'){
        this.mapmakerService.getAllMap().subscribe((resp: any) => {
          this.locations = resp.filter(c => c.Category == message);
        })
      }


    });

  }

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
}
