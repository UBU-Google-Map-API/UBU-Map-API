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
  profileForm = this.fb.group({
    Id: [null, Validators.required],
    Name: [null, Validators.required],
    Address: [null, Validators.required],
    Province: [null, Validators.required],
    Study_Plants: [null, Validators.required],
    Status: [null, Validators.required],
    School_Web: [null],
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

  // date = moment();
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
  ViewImage: any = [];
  UserName = this.authService.userLogin.name;

  ngOnInit(): void {

    this.profileForm = new FormGroup({
      Id: new FormControl(null, Validators.required),
      Name: new FormControl(this.UserName),
      Address: new FormControl(null, Validators.required),
      Province: new FormControl(null, Validators.required),
      Study_Plants: new FormControl(null, Validators.required),
      Status: new FormControl(null, Validators.required),
      School_Web: new FormControl(null),
      Register_date: new FormControl(null),
      Certificate_date1: new FormControl(null),
      Certificate_date2: new FormControl(null),
      Category: new FormControl(null, Validators.required),
      Vdo: new FormControl(),
      Latitude: new FormControl(null, Validators.required),
      Longitude: new FormControl(null, Validators.required),
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
    });

    this.postService.getPostData(this.UserName).subscribe((res: any) => {
      
      
      this.profileForm = new FormGroup({
        Id: new FormControl(null, Validators.required),
        Name: new FormControl(this.UserName),
        Address: new FormControl(null, Validators.required),
        Province: new FormControl(null, Validators.required),
        Study_Plants: new FormControl(null, Validators.required),
        Status: new FormControl(null, Validators.required),
        School_Web: new FormControl(null),
        Register_date: new FormControl(null),
        Certificate_date1: new FormControl(null),
        Certificate_date2: new FormControl(null),
        Category: new FormControl(null, Validators.required),
        Vdo: new FormControl(),
        Latitude: new FormControl(null, Validators.required),
        Longitude: new FormControl(null, Validators.required),
        image0: new FormControl(res[0].Picture_1),
        image1: new FormControl(res[0].Picture_2),
        image2: new FormControl(res[0].Picture_3),
        image3: new FormControl(res[0].Picture_4),
        image4: new FormControl(res[0].Picture_5),
        image5: new FormControl(res[0].Picture_6),
        image6: new FormControl(res[0].Picture_7),
        image7: new FormControl(res[0].Picture_8),
        image8: new FormControl(res[0].Picture_9),
        image9: new FormControl(res[0].Picture_1),
      });

      this.ViewImage.push(res[0].Picture_1);
      this.ViewImage.push(res[0].Picture_2);
      this.ViewImage.push(res[0].Picture_3);
      this.ViewImage.push(res[0].Picture_4);
      this.ViewImage.push(res[0].Picture_5);
      this.ViewImage.push(res[0].Picture_6);
      this.ViewImage.push(res[0].Picture_7);
      this.ViewImage.push(res[0].Picture_8);
      this.ViewImage.push(res[0].Picture_9);
      this.ViewImage.push(res[0].Picture_10);

      for (let i = 0; i < this.ViewImage.length; i++) {
        if (this.ViewImage[i] == 'NoImageFound.png') {
          this.ViewImage.splice(i);
        }
      }
      // console.log(this.profileForm.value);
    })
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

    let date1 = this.profileForm.get('Register_date').value;
    let date2 = this.profileForm.get('Certificate_date1').value;
    let date3 = this.profileForm.get('Certificate_date2').value;

    if (date1 != null) {
      this.profileForm.controls['Register_date'].setValue(moment(date1).format('YYYY-MM-DD'));
    } if (date2 != null) {
      this.profileForm.controls['Certificate_date1'].setValue(moment(date2).format('YYYY-MM-DD'));
    } if (date3 != null) {
      this.profileForm.controls['Certificate_date2'].setValue(moment(date3).format('YYYY-MM-DD'));
    }

    // console.log(this.profileForm.value);
    if(this.profileForm.get('image0').value == null){this.profileForm.controls['image0'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image1').value == null){this.profileForm.controls['image1'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image2').value == null){this.profileForm.controls['image2'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image3').value == null){this.profileForm.controls['image3'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image4').value == null){this.profileForm.controls['image4'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image5').value == null){this.profileForm.controls['image5'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image6').value == null){this.profileForm.controls['image6'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image7').value == null){this.profileForm.controls['image7'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image8').value == null){this.profileForm.controls['image8'].setValue('NoImageFound.png');}
    if(this.profileForm.get('image9').value == null){this.profileForm.controls['image9'].setValue('NoImageFound.png');}
    

    this.postService.PostHome(this.profileForm.value).subscribe((res) => {
      // console.log(res);
    })


    this.uploadService.uploadMultiFile(formData).subscribe((res) => {
      // console.log(res);
    })

    this.router.navigate(["/"]);

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
      const num = event.target.files.length;
      
      for (let i = 1; i <= num; i++) {
        let fileToUpload = <File>event.target.files[i-1];
        // console.log('fileToUpload',fileToUpload);
        let fileName: string = this.profileForm.value.Name + '-' + 'Picture_' + i;
        // console.log('fileName',fileName);
        let fileExtension: string = fileToUpload.name.split('.').pop();
        // console.log('fileExtension',fileExtension);
        const newFile: File = new File([fileToUpload], fileName + '.' + fileExtension, { type: fileExtension });
        // console.log('newFile',newFile);
        this.multipleImages.push(newFile);
      }
    }
    console.log(this.multipleImages);

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


    console.log(this.multipleImages);
    console.log('formData',formData);


    this.uploadService.uploadMultiFile(formData).subscribe((res) => {
      console.log(res);
    })
  }

  Delete(image: any) {
    const index = this.Images.indexOf(image);
    this.Images.splice(index, 1);
    this.allfiles.splice(index, 1);
  }

  DeleteIMG(name) {
    const index = this.ViewImage.indexOf(name);
    this.ViewImage.splice(index, 1);
    this.allfiles.splice(index, 1);
    console.log(name);
  }
}
