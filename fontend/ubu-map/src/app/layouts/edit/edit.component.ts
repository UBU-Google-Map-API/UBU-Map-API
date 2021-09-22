import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { AuthService } from "src/app/services/auth.service";
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { MapmakerService } from 'src/app/services/mapmaker.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) {
    // this.userID = this.route.snapshot.paramMap.get('id');
    this.userName = this.route.snapshot.paramMap.get('name');
  }

  multipleImages = [];
  ImageName: any = [];
  Statu: any = ['ป้ายพระราชทาน', 'ก.1', 'ก.2'];
  Categorys: any = ['โรงเรียน', 'องค์การบริหารส่วนตําบล'];
  Provinces;

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
        Status: new FormControl(res[0].Status),
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
    })

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
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
    const files = event.target.files;
    for (let name of files) {
      this.ImageName.push(name.name);
      // console.log(name.name);
    }
  }

  onSubmitForm() {
    // console.log(this.multipleImages);
    const contImage = this.ImageName.length;
    // console.log(contImage);
    for (let i = 0; i < contImage; i++) {
      this.profileForm.controls['image' + i].setValue(this.ImageName[i]);
    }
  }
}
