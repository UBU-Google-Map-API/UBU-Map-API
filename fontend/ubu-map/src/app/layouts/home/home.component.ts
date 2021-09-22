import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileService } from 'src/app/services/file.service';
import { PostsService } from 'src/app/services/posts.service';
import { MapmakerService } from 'src/app/services/mapmaker.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uploadedFiles: Array<File>;

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  // private fileName
  // images/107856190_3073699929411585_8638358709965849897_n.jpg;
  // url = 'http://localhost:3000/' + 'images/' + 'image.png';

  profileForm = this.fb.group({
    Id: [null, Validators.required],
    Name: [null, Validators.required],
    Address: [null, Validators.required],
    Province: [null, Validators.required],
    Status: [null, Validators.required],
    Register_date: [null,],
    Certificate_date1: [null,],
    Certificate_date2: [null,],
    Category: [null, Validators.required],
    Vdo: [null,],
    Latitude: [null, Validators.required],
    Longitude: [null, Validators.required],
    image0: ['NoImageFound.png'],
    image1: ['NoImageFound.png'],
    image2: ['NoImageFound.png'],
    image3: ['NoImageFound.png'],
    image4: ['NoImageFound.png'],
    image5: ['NoImageFound.png'],
    image6: ['NoImageFound.png'],
    image7: ['NoImageFound.png'],
    image8: ['NoImageFound.png'],
    image9: ['NoImageFound.png'],
  });

  date = moment();

  selDate: string;
  selMonth: string;
  selYear: string;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private uploadService: FileUploadService,
    private postService: PostsService,
    private mapService: MapmakerService,
    private router: Router,
    private authService: AuthService,
  ) { }
  urls = [];
  images;
  multipleImages = [];
  cont = 0;
  ImageName: any = [];
  allfiles: any = [];
  Images: any = [];
  Provinces;
  Statu: any = ['ป้ายพระราชทาน', 'ก.1', 'ก.2'];
  Categorys: any = ['โรงเรียน', 'องค์การบริหารส่วนตําบล'];

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(this.authService.userLogin.name),
      Address: new FormControl(),
      Province: new FormControl(),
      Status: new FormControl(),
      Register_date: new FormControl(),
      Certificate_date1: new FormControl(),
      Certificate_date2: new FormControl(),
      Category: new FormControl(),
      Vdo: new FormControl(),
      Latitude: new FormControl(),
      Longitude: new FormControl(),
      image0: new FormControl('NoImageFound.png'),
      image1: new FormControl('NoImageFound.png'),
      image2: new FormControl('NoImageFound.png'),
      image3: new FormControl('NoImageFound.png'),
      image4: new FormControl('NoImageFound.png'),
      image5: new FormControl('NoImageFound.png'),
      image6: new FormControl('NoImageFound.png'),
      image7: new FormControl('NoImageFound.png'),
      image8: new FormControl('NoImageFound.png'),
      image9: new FormControl('NoImageFound.png'),
    });


    this.mapService.getProvince().subscribe((res: any) => {
      // console.log(res);
      this.Provinces = res;
    }
    );
    // this.mapService.getStatus().subscribe((res:any)=>{
    //   this.Status = res;
    // });
    // this.uploadService.getImage1().subscribe((res) => {
    //   console.log(res);
    // });

  }
  onSubmitForm() {
    const contImage = this.ImageName.length;
    for (let i = 0; i < contImage; i++) {
      const name = this.profileForm.value.Name;
      this.profileForm.controls['image' + i].setValue(this.ImageName[i]);
    }

    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }


    // console.log('this.multipleImages',this.multipleImages);
    // console.log('this.profileForm.value',this.profileForm.value);



    // console.log(this.profileForm.value);

    // console.log(this.profileForm.value);
    // const formData = new FormData();
    // for (let img of this.multipleImages) {
    //   // console.log('IMG',img.name);
    //   formData.append('files', img);
    // }
    // formData.forEach((value, key) => {

    //   console.log('value', value.name);

    // })




    // console.log("FORM",formData.getAll('files'));

    // for(let i = 0; i < formData.getAll('files').length; i++){
    //   if(i=0){
    //     this.profileForm.value.image0 = formData.getAll('files')[0].name;
    //   }
    //   // this.profileForm.value.image0 = formData.getAll('files')[0].name;
    //   // console.log(formData.getAll('files')[i]);
    // }

    // console.log(formData[0].name);
    // console.log(this.profileForm.value);


    // -----------------------------------------------------------------------------------------------------------

    console.log('ป้ายพระราชทาน', this.profileForm.value.Register_date);
    console.log('ก1', this.profileForm.value.Certificate_date1);
    console.log('ก2', this.profileForm.value.Certificate_date2);


    // this.postService.PostHome(this.profileForm.value).subscribe((res) => {
    //   // console.log(res);
    // })


    // this.uploadService.uploadMultiFile(formData).subscribe((res) => {
    //   // console.log(res);
    // })

    // this.router.navigate([""]);

  }

  

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value);
    this.selDate = this.date.format('DD');
    this.selMonth = this.date.format('MM');
    this.selYear = this.date.format('YYYY');
    
  }

  selectImage(event) {


    // if (event.target.files.length > 0) {
    //   let fileToUpload = <File>event.target.files[0];
    //   let fileName: string = this.profileForm.value.name + '-' + 'Picture';
    //   let fileExtension: string = fileToUpload.name.split('.').pop();
    //   const newFile: File = new File([fileToUpload], fileName + '.' + fileExtension, { type: fileExtension });
    //   console.log(newFile);
    //   this.images = newFile;
    // }

    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   console.log('File',file);

    //   this.images = file;
    //   console.log('FileName',this.images);
    // }
  }

  selectMultipleImages(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let fileToUpload = <File>event.target.files[i];
        let fileName: string = this.profileForm.value.Name + '-' + 'Picture_' + i;
        let fileExtension: string = fileToUpload.name.split('.').pop();
        const newFile: File = new File([fileToUpload], fileName + '.' + fileExtension, { type: fileExtension });
        this.multipleImages.push(newFile);
      }
    }
    // console.log(this.multipleImages);

    for (let name of this.multipleImages) {
      this.ImageName.push(name.name);
      // console.log('Name',this.ImageName);
    }

    // const files = event.target.files;
    // for (let name of files) {
    //   this.ImageName.push(name.name);
    //   console.log('NAME', this.ImageName);
    // }

    // console.log(files);
    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     const image = {
    //       name: '',
    //       type: '',
    //       size: '',
    //       url: ''
    //     };
    //     this.allfiles.push(files[i]);
    //     image.name = files[i].name;
    //     image.type = files[i].type;
    //     image.size = files[i].size;
    //     const reader = new FileReader();
    //     reader.onload = (filedata) => {
    //       image.url = reader.result + '';
    //       this.Images.push(image);
    //     };
    //     reader.readAsDataURL(files[i]);
    //   }
    //   event.srcElement.value = null;
    // }


    // if (event.target.files.length > 0) {
    //   for(let i=0;i<event.target.files.length;i++){
    //     // console.log(i);
    //     let fileToUpload = <File>event.target.files[i];
    //     let fileName: string = this.profileForm.value.name + '-' + 'Picture_'+i;
    //     let fileExtension: string = fileToUpload.name.split('.').pop();
    //     const newFile: File = new File([fileToUpload], fileName + '.' + fileExtension, { type: fileExtension });
    //     // var reader = new FileReader();
    //     // reader.readAsDataURL(event.target.files[i]);
    //     // reader.onload = (event) => {
    //     //   this.urls.push(event.target.result);
    //     // }
    //     this.multipleImages.push(newFile);
    //   }
    //   // this.multipleImages = event.target.files;
    // }


  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);
    // console.log(this.images.name);

    this.uploadService.uploadFile(formData).subscribe((res) => {
      // console.log(res);

    })
  }

  onSubmitMultiple() {
    const formData = new FormData();
    const name = this.profileForm.value.Name;
    for (let img of this.multipleImages) {
      // console.log("img",img);
      formData.append('files', img);
      // formData.append('files', name);
    }


    // console.log(this.multipleImages);
    // console.log('formData',formData);


    this.uploadService.uploadMultiFile(formData).subscribe((res) => {
      // console.log(res);
    })
  }

  Delete(image: any) {
    const index = this.Images.indexOf(image);
    this.Images.splice(index, 1);
    this.allfiles.splice(index, 1);
  }
}
