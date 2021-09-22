import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostsService } from 'src/app/services/posts.service';
import { VideosComponent } from '../videos/videos.component';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  animal;
  url;
}


interface Value {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  [x: string]: any;
  month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];


  title = 'testImage'
  homeSlider = { items: 1, dots: true, nav: true, loop: true, autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true };
  userName: string;
  details: any;
  imageName = [];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private postService: PostsService,
    private fileuploadService: FileUploadService,
  ) {
    this.userName = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {

    this.postService.getPostData(this.userName).subscribe((res: any) => {
      this.details = res;

      this.details[0]['date1'] = `${parseInt(moment.utc(this.details[0].Register_date).format('DD'))} ${this.month[parseInt(moment.utc(this.details[0].Register_date).format('MM')) - 1]} ${parseInt(moment.utc(this.details[0].Register_date).format('YYYY')) + 543}`;
      this.details[0]['date2'] = `${parseInt(moment.utc(this.details[0].Certificate_date1).format('DD'))} ${this.month[parseInt(moment.utc(this.details[0].Certificate_date1).format('MM')) - 1]} ${parseInt(moment.utc(this.details[0].Certificate_date1).format('YYYY')) + 543}`;
      this.details[0]['date3'] = `${parseInt(moment.utc(this.details[0].Certificate_date2).format('DD'))} ${this.month[parseInt(moment.utc(this.details[0].Certificate_date2).format('MM')) - 1]} ${parseInt(moment.utc(this.details[0].Certificate_date2).format('YYYY')) + 543}`;

      console.log(this.details);
      // console.log('date1',this.details[0]['date1']);
      // console.log('date2',this.details[0]['date2']);
      // console.log('date3',this.details[0]['date3']);


      res.forEach(element => {
        this.imageName.push(element.Picture_1);
        this.imageName.push(element.Picture_2);
        this.imageName.push(element.Picture_3);
        this.imageName.push(element.Picture_4);
        this.imageName.push(element.Picture_5);
        this.imageName.push(element.Picture_6);
        this.imageName.push(element.Picture_7);
        this.imageName.push(element.Picture_8);
        this.imageName.push(element.Picture_9);
        this.imageName.push(element.Picture_10);
      });

    })


  }
  animal: string;
  name: string;

  openDialog(Vdo) {
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda'
    //   }
    // });
    // this.dialog.open(VideosComponent,{
    //   data: {Vdo:Vdo}
    // });
  }

  openDialog2(Vdo) {
    // this.dialog.open(DialogDataExampleDialog, {data: {url:Vdo}});
    let dialogRef = this.dialog.open(YourDialog, {
      data: { name: Vdo },
    });
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'https://www.youtube.com/embed/si-KRlothfs',
    //     url: Vdo
    //   }
    // });
  }

}

@Component({
  selector: 'videos.component',
  template: `<h1 mat-dialog-title>Videos</h1>
  {{data.name}}
  <div mat-dialog-content>
  <iframe width="560" height="315" [src]=data.name frameborder="0" allowfullscreen></iframe>

  <iframe width="560" height="315" src={{data.name}} frameborder="0" allowfullscreen></iframe>

  <iframe width="560" height="315" bind-src="data.name" frameborder="0" allowfullscreen></iframe>
  </div>`,
})
export class YourDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }
}

// @Component({
//   selector: 'videos.component',
//   templateUrl: 'videos.component.html',
// })

// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
// }