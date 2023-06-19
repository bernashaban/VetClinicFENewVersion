import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UpdatepopupComponent} from "../updatepopup/updatepopup.component";

@Component({
  selector: 'app-userlisting',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {

  displayedColumns: string[] = ['fullName', 'username', 'email', 'phoneNum', 'roles', 'address', 'active', 'action'];

  constructor(private service: AuthService, private dialog:MatDialog) {
    this.loadUser();

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

}
