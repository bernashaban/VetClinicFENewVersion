import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Vet Clinic Draft';
  isMenuRequired=false;
  isAdmin=false;
  isVet=false;
  profilePage = '';
  constructor(private router:Router,private service:AuthService) {
  }
  ngDoCheck(): void {
    let currentUrl=this.router.url;

    if(currentUrl=='/login'||currentUrl=='/register'){
      this.isMenuRequired=false;
    }else{
      this.isMenuRequired=true;
    }
    if(this.service.getUserRole()==="ROLE_VET,ROLE_ADMIN"){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
    if(this.service.getUserRole()==="ROLE_VET"){
      this.isVet=true;
    }else{
      this.isVet=false;
    }
    if(this.service.isLoggedIn()){
      if(this.service.getUserRole()=='ROLE_OWNER'){
        this.profilePage = 'owner-profile-page';
      }else if(this.service.getUserRole()=="ROLE_VET"){
        this.profilePage = 'vet-profile-page';
      }else {
       this.profilePage = 'admin-profile-page';
      }
    }

  }
}
