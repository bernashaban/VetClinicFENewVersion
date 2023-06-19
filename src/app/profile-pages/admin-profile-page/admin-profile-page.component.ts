import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UpdatepopupComponent} from "../../updatepopup/updatepopup.component";
import {Router} from "@angular/router";
import {User} from "../../service/user/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css']
})
export class AdminProfilePageComponent {

  displayedColumns: string[] = ['fullName', 'username', 'email', 'phoneNum', 'roles', 'address', 'active', 'action'];
  currentUser: User;
  constructor(private service: AuthService, private dialog:MatDialog, private router: Router,) {
    this.loadUser();
this.getUserInfo();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator
  @ViewChild(MatSort) sort !:MatSort

  loadUser() {
    this.service.getAll().subscribe(res => {
      console.log(res)
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }
  getUserInfo(): void {
    this.service.getByUsername("admin").subscribe(
      (response: any) => {
        console.log(this.currentUser)
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  updateUser(username: any) {
    const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        username:username
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadUser();
    })
  }

  onLogoutClicked() {
    this.router.navigate(['/login']);
  }
}
