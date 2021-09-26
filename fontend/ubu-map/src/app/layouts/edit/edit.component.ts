import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { AuthService } from "src/app/services/auth.service";
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { MapmakerService } from 'src/app/services/mapmaker.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as _moment from 'moment';
const moment = _moment;


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  userID: string;
  userName: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private postService: PostsService,
    private route: ActivatedRoute,
    private mapService: MapmakerService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    // this.userID = this.route.snapshot.paramMap.get('id');
    this.userName = this.route.snapshot.paramMap.get('name');
  }

  multipleImages = [];
  ImageName: any = [];
  Statu: any = ['ป้ายพระราชทาน', 'ก.1', 'ก.2'];
  Categorys: any = ['โรงเรียน', 'องค์การบริหารส่วนตําบล'];
  Provinces;
  ViewImage: any = [];
  allfiles: any = [];

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

  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl(null, [])
  });

  role: any = ['super-admin', 'Author']

  ngOnInit(): void {
    this.mapService.getProvince().subscribe(data => {
      this.Provinces = data;
    })


    this.postService.getPostData(this.userName).subscribe((res: any) => {      
      // console.log(res[0]);
      this.profileForm = new FormGroup({
        Id: new FormControl(res[0].Id),
        Name: new FormControl(res[0].name),
        Address: new FormControl(res[0].Address),
        Province: new FormControl(res[0].Province),
        Study_Plants: new FormControl(res[0].Study_Plants),
        Status: new FormControl(res[0].Status),
        School_Web: new FormControl(res[0].School_Web),
        School_Website: new FormControl(res[0].School_Website),
        Register_date: new FormControl(res[0].Register_date),
        Certificate_date1: new FormControl(res[0].Certificate_date1),
        Certificate_date2: new FormControl(res[0].Certificate_date2),
        Category: new FormControl(res[0].Category),
        Vdo: new FormControl(res[0].Vdo),
        Latitude: new FormControl(res[0].Latitude),
        Longitude: new FormControl(res[0].Longitude),
        image0: new FormControl(res[0].Picture_1),
        image1: new FormControl(res[0].Picture_2),
        image2: new FormControl(res[0].Picture_3),
        image3: new FormControl(res[0].Picture_4),
        image4: new FormControl(res[0].Picture_5),
        image5: new FormControl(res[0].Picture_6),
        image6: new FormControl(res[0].Picture_7),
        image7: new FormControl(res[0].Picture_8),
        image8: new FormControl(res[0].Picture_9),
        image9: new FormControl(res[0].Picture_10),
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
        // console.log(i);
        
        if (this.ViewImage[i] == 'NoImageFound.png') {
          this.ViewImage.splice(i);
        }
        if(this.ViewImage[i] == null) {
          this.ViewImage.splice(i);         
        }
      }
      // console.log(this.ViewImage);

      this.userID = res[0].id;

      this.signupForm = new FormGroup({
        name: new FormControl(res[0].name),
        username: new FormControl(res[0].username),
        password: new FormControl(res[0].password)
      });
    })

  }

  UpdateUser() {
    this.userService.updateUser(this.userID, this.signupForm.value).subscribe(res => {
      // console.log(res);
    });

    // this.location.back();
    Swal.fire({
      title: 'สำเสร็จ',
      text: 'อัปเดตข้อมูลผู้ใช้งานสำเสร็จ',
      icon: 'success',
      showCancelButton: true,
      // cancelButtonText: 'ปิด'
    }).then((result) => {
      if (result.value) {
        this.location.back();
      }
    });
  }

  updatePost() {
    // console.log(this.profileForm.value);

    this.postService.updatePost(this.userName, this.profileForm.value).subscribe(res => {
      // console.log(res);
    });

  }

  back(): void {
    this.location.back()
  }

  selectMultipleImages(event) {
    // if (event.target.files.length > 0) {
    //   this.multipleImages = event.target.files;
    // }
    // const files = event.target.files;
    // for (let name of files) {
    //   this.ImageName.push(name.name);
    //   // console.log(name.name);
    // }
    if (event.target.files.length > 0) {
      const num = event.target.files.length;

      for (let i = 1; i <= num; i++) {
        let fileToUpload = <File>event.target.files[i - 1];
        let fileName: string = this.profileForm.value.Name + '-' + 'Picture_' + i;
        let fileExtension: string = fileToUpload.name.split('.').pop();
        const newFile: File = new File([fileToUpload], fileName + '.' + fileExtension, { type: fileExtension });
        this.multipleImages.push(newFile);
      }
    }

    for (let name of this.multipleImages) {
      this.ImageName.push(name.name);
    }
  }

  onSubmitForm() {
    // const contImage = this.ImageName.length;
    // for (let i = 0; i < contImage; i++) {
    //   this.profileForm.controls['image' + i].setValue(this.ImageName[i]);
    // }

    const contImage = this.ImageName.length;
    for (let i = 0; i < contImage; i++) {
      this.profileForm.controls['image' + i].setValue(this.ImageName[i]);
    }

    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }
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
    if (this.profileForm.get('image0').value == null) { this.profileForm.controls['image0'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image1').value == null) { this.profileForm.controls['image1'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image2').value == null) { this.profileForm.controls['image2'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image3').value == null) { this.profileForm.controls['image3'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image4').value == null) { this.profileForm.controls['image4'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image5').value == null) { this.profileForm.controls['image5'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image6').value == null) { this.profileForm.controls['image6'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image7').value == null) { this.profileForm.controls['image7'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image8').value == null) { this.profileForm.controls['image8'].setValue('NoImageFound.png'); }
    if (this.profileForm.get('image9').value == null) { this.profileForm.controls['image9'].setValue('NoImageFound.png'); }


    this.postService.updatePost(this.userName, this.profileForm.value).subscribe(res => {
      // console.log(res);
    });

    this.fileUploadService.uploadMultiFile(formData).subscribe((res) => {
      // console.log(res);
    })
    this.location.back();

    // this.router.navigate(["/"]);
  }

  DeleteIMG(name) {
    Swal.fire({
      title: 'ยืนยันการลบรูปภาพ',
      text: 'คุณกำลังลบรูปภาพ, ต้องการดำเนินการต่อไปหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'ปิด',
      confirmButtonText: 'ลบรูปภาพ'
    }).then((result) => {
      if (result.value) {
        const index = this.ViewImage.indexOf(name);
        this.ViewImage.splice(index, 1);
        this.allfiles.splice(index, 1);
        this.fileUploadService.deleteFile(name).subscribe((res: any) => { });
        Swal.fire(
          'ลบรูปภาพ!',
          'รูปภาพถูกลบออก',
          'success'
        )
        // this.location.back();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก',
          'รูปภาพถูกยกเลิก',
          'error'
        )
      }
    })
  }
}
