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
import {UpdatePopupPersonalInfoComponent} from "../../update-popup-personal-info/update-popup-personal-info.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css']
})

export class AdminProfilePageComponent {
  displayedColumns: string[] = ['fullName','phoneNum', 'address', 'username', 'email', 'roles',  'active', 'action'];
  currentUser: User;
  constructor(private service: AuthService, private dialog:MatDialog, private router: Router,private toastr:ToastrService,) {
    this.getUserInfo();
    this.loadUser();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator
  @ViewChild(MatSort) sort !:MatSort
  searchKey: string;

  loadUser() {
    this.service.getAll().subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    console.log(id)
    this.service.deleteById(id).subscribe((data) =>
      this.loadUser()
    );
    this.toastr.success('Успешно изтриване!');
  }
  getUserInfo(): void {
    this.service.getByUsername(this.service.getLoggedIn()).subscribe(
      (response: any) => {
        console.log(this.currentUser)
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  update(username: any) {
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

  updatePersonalInfo(username: any) {
      const popup = this.dialog.open(UpdatePopupPersonalInfoComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        width: '50%',
        data: {
          username: username
        }
      })
      popup.afterClosed().subscribe(res => {
        this.getUserInfo()
      })
  }

  onLogoutClicked() {
    this.router.navigate(['/login']);
  }

  getRole(role:string):string{
    if(role=="ROLE_OWNER"){
      return "Потребител"
    }else if(role=="ROLE_VET"){
      return "Ветеринар"
    }
    return "Администратор"
  }
}
