import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export interface UserData {
  id: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  userID:string;
  
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {
      this.userID = this.route.snapshot.paramMap.get('id');
    }
  userData: any;

  ngOnInit(): void {
    
    this.UserService.getAllUser().subscribe((resp: any) => {
      this.userData = resp.filter(c => c.id == this.userID);
      // console.log(this.userData);
      
    })
  }

  back(): void {
    this.location.back()
  }

  Edit(name) {
    this.router.navigate(['/edit/'+name], {relativeTo: this.route});
  }
  Delete(id) {
    Swal.fire({
      title: 'ยืนยันการลบข้อมูล',
      text: 'คุณกำลังลบข้อมูล, ต้องการดำเนินการต่อไปหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'ปิด',
      confirmButtonText: 'ลบข้อมูล'
    }).then((result) => {
      if (result.value) {
        this.UserService.deleteUser(id).subscribe(res => {
          // console.log(res);
        })

        Swal.fire(
          'ลบข้อมูล!',
          'ข้อมูลถูกลบออก',
          'success'
        )
        this.location.back();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก',
          'ข้อมูลถูกยกเลิก',
          'error'
        )
      }
    })
  }
  // Delete(id) {
  //   // console.log('Delete');
  //   this.UserService.deleteUser(id).subscribe(res => {
  //     console.log(res);
  //   })
  //   this.location.back()
  // }

}
