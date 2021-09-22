import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


export interface UserData {
  id: string;
  name: string;
  username: string;
  Role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'username', 'Role', 'Action'];
  dataSource: MatTableDataSource<UserData>;
  dataSource2: MatTableDataSource<UserData>;

  User: any;
  Roles: any;
  ID = [];
  constructor(
    private authService: AuthService,
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    // console.log("data", this.dataSource);

    this.authService.currentUser.subscribe(user => {
      // console.log(user);
    })

    // this.UserService.getAllUser().subscribe(user => {
    //   this.User = user;
    //   // console.log('this.User',this.User);

    //   this.dataSource = new MatTableDataSource(this.User);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   // console.log(user);
    // })

    this.UserService.getRolesUser().subscribe((res: any) => {
      // console.log('res',res);
      this.User = res;
      this.dataSource = new MatTableDataSource(this.User);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Views(id) {
    this.router.navigate(['/views/' + id], { relativeTo: this.route });
  }

  Edit(id) {
    this.router.navigate(['/edit/' + id], { relativeTo: this.route });
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'ยกเลิก',
          'ข้อมูลถูกยกเลิก',
          'error'
        )
      }
    })
  }
  


}
