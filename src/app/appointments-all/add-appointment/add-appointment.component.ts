import {Component} from '@angular/core';
import {AppointmentService} from "../../service/appointment/appointment.service";

import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User, UserService} from "../../service/user/user.service";
import {Pet, PetService} from "../../service/pet/pet.service";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
 })
export class AddAppointmentComponent {
  appointment: any;

  currentUser: User;
  pet: any;
  vet: any;
  type: any = 'първичен преглед';
  date: any;
  time: any;

  selectVet(inputVet:any){
    this.vet = inputVet;
    console.log("from select vet" + this.vet)
  }

  pets:any;
  vets:any;
  specVets:any;
  types:any;
  times:any;

  duration:any = 0.5;
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let month
    if(event.value?.getMonth() != undefined){
      month = event.value?.getMonth()+1
    }
    console.log(this.vet)
    console.log(this.type)
    console.log(this.pet)
    this.date = event.value?.getFullYear() + "-" + month + "-" +event.value?.getDate()
    this.events.push(`${type}: ${event.value}`);
  }

  appointmentForm = this.builder.group({
    type: this.builder.control('', Validators.required),
    pet: this.builder.control('', Validators.required),
    vet: this.builder.control('', Validators.required),
    date: this.builder.control('', Validators.required),
    time: this.builder.control('', Validators.required),
    description: this.builder.control(""),
    status: this.builder.control("UPCOMING"),
  });
  todayDate:Date = new Date();
  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private service: AuthService,
              private router: Router,
              private authService: AuthService,
              private appointmentService: AppointmentService,
              private petService: PetService) {
    this.getUserInfo();
    this.getTypes();
    this.getVets();
    this.getPets();
    this.times = ["11:30"];
  }

  filterVetsByType(type:string){
    if(type=="първичен преглед"||type=="профилактичен"){
      this.duration=0.5; //30 мин/половин час
      this.specVets = this.vets.filter((vet:User)=>vet.speciality == "REVIEWS,PREVENTIVE");
      console.log("duration:" + this.duration)
      console.log(this.specVets)
      return this.specVets;
    }else if(type=="стоматологичен"||type=="изследване"){
      this.duration=1; //60 мин/1 час
      this.specVets = this.vets.filter((vet:User)=>vet.speciality == "DENTISTRY,RESEARCH");
      console.log("duration:" + this.duration)
      console.log(this.specVets)
      return this.specVets;
    }else if(type=="кастрация"||type=="хирургия"){
      this.duration=2; //120 мин/2 часа
      this.specVets = this.vets.filter((vet:User)=>vet.speciality == "CASTRATIONS,SURGERY");
      console.log("duration:" + this.duration)
      console.log(this.specVets)
      return this.specVets;
    }
  }


  submitAppointment() {
    if (this.appointmentForm.valid) {
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(res => {
        this.toastr.success('Успешно запазен час!');
        this.router.navigate(['owner-profile-page']);
      });
    }else{
      this.toastr.warning("Некоректни данни!!!");
    }
  }

  getFreeTimes(): void {
    console.log(this.appointmentForm.value.vet)
    console.log(this.appointmentForm.value.date)
    this.appointmentService.getFreeHours(this.vet, this.date).subscribe(
      (response: string[]) => {
        console.log(response)
        this.times= response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }

  getUserInfo(): void {
    this.authService.getByUsername(this.authService.getLoggedIn()).subscribe(
      (response: any) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }


  getPets(): void {
   this.authService.getByUsername(this.authService.getLoggedIn()).subscribe(
        (response: any) => {

          this.petService.getPetsByOwner(response.id).subscribe(
            (response: Pet[]) => {
              this.pets = response;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });

        }
      )
  }



  getVets(): void {
    this.authService.getAllVets().subscribe(
      (response: any) => {
        this.vets = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  getTypes(): void {
    this.types = [
      "първичен преглед", "профилактичен", //30 мин
      "стоматологичен", "изследване", //60 мин
      "кастрация", "хирургия", //120 мин
    ]
  }

  prettyDate(date: string): string {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return day + "." + month + "." + year
  }

  prettyTime(date: string): string {
    let hour = date.substring(0, 2);
    let minute = date.substring(3, 5);
    return hour + ":" + minute;
  }

}
