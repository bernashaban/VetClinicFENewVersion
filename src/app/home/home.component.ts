import { Component } from '@angular/core';
import {User, UserService} from "../service/user/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public vets: User[] = [];
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.getVets();
  }
  getVets(): void {
    this.service.getAllVets().subscribe(
      (response: User[]) => {
        let array = this.vets = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }
  getPrettyDate(date:string): string{
    let day = date.substring(8, 10);
    let month = date.substring(5,7);
    let year = date.substring(0,4);
    return day + "." + month + "." + year;
  }
}
