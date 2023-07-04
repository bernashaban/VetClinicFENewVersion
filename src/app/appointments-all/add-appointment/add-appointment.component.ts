import {Component} from '@angular/core';
import {AppointmentService} from "../../service/appointment/appointment.service";

import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../service/user/user.service";
import {Pet, PetService} from "../../service/pet/pet.service";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent {
  types: Type[] = [
    {value: 'REVIEWS', viewValue: 'първичен преглед'},
    {value: 'PREVENTIVE', viewValue: 'профилактичен'},
    {value: 'RESEARCH', viewValue: 'изследване'},
    {value: 'CASTRATIONS', viewValue: 'кастрация'},
    {value: 'SURGERY', viewValue: 'хирургия'},
    {value: 'DENTISTRY', viewValue: 'стоматологичен'},
  ];

  currentUser: User;
  pet: any;
  vet: any;
  type: any;
  date: any;
  time: any;

  pets: any;
  vets: any;
  specVets: any;
  times: any;

  duration: any = 0.5;
  events: string[] = [];
  eventValue: any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.eventValue = event.value
    this.getFreeTimes()
  }

  appointmentForm = this.builder.group({
    type: this.builder.control('', Validators.required),
    pet: this.builder.control('', Validators.required),
    vet: this.builder.control(''),
    date: this.builder.control('', Validators.required),
    time: this.builder.control('', Validators.required),
    description: this.builder.control(""),
    status: this.builder.control("UPCOMING"),
  });

  todayDate: Date = new Date();

  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private service: AuthService,
              private router: Router,
              private authService: AuthService,
              private appointmentService: AppointmentService,
              private petService: PetService) {
    this.getUserInfo();
    this.getVets();
  }

  filterVetsByType(type: string) {
    if (type == "първичен преглед" || type == "профилактичен") {
      this.duration = 30; //30 мин/половин час
      this.specVets = this.vets.filter((vet: User) => vet.speciality == "REVIEWS,PREVENTIVE");
      return this.specVets;
    } else if (type == "стоматологичен" || type == "изследване") {
      this.duration = 60; //60 мин/1 час
      this.specVets = this.vets.filter((vet: User) => vet.speciality == "DENTISTRY,RESEARCH");
      return this.specVets;
    } else if (type == "кастрация" || type == "хирургия") {
      this.duration = 120; //120 мин/2 часа
      this.specVets = this.vets.filter((vet: User) => vet.speciality == "CASTRATIONS,SURGERY");
      return this.specVets;
    }
  }

  getVetId() {
    return this.vet.id
  }

  getFreeTimes() {
    let date = this.getFormattedDate(this.eventValue.toString())
    this.appointmentService.getFreeHours(this.vet.id, date, this.duration).subscribe(
      (response: string[]) => {
        this.times = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  getUserInfo(): void {
    this.authService.getByUsername(this.authService.getLoggedIn()).subscribe(
      (response: any) => {
        this.currentUser = response;
        this.getPets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }


  getPets(): void {
    this.petService.getPetsByOwner(this.currentUser.id).subscribe(
      (response: Pet[]) => {
        this.pets = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
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

  getFormattedDate(date: string): string {
    //"Wed Jul 05  2023 00:00:00 GMT+0300 (Eastern European Summer Time)"
    let day = date.substring(8, 10);

    let month = date.substring(4, 7);
    let parsedMonth = ""
    if (month == "Jan") {
      parsedMonth = "01"
    } else if (month == "Feb") {
      parsedMonth = "02"
    } else if (month == "Mar") {
      parsedMonth = "03"
    } else if (month == "Apr") {
      parsedMonth = "04"
    } else if (month == "May") {
      parsedMonth = "05"
    } else if (month == "Jun") {
      parsedMonth = "06"
    } else if (month == "Jul") {
      parsedMonth = "07"
    } else if (month == "Aug") {
      parsedMonth = "08"
    } else if (month == "Sep") {
      parsedMonth = "09"
    } else if (month == "Oct") {
      parsedMonth = "10"
    } else if (month == "Nov") {
      parsedMonth = "11"
    } else if (month == "Dec") {
      parsedMonth = "12"
    }
    let year = date.substring(11, 15);
    return year + "-" + parsedMonth + "-" + day
  }

  submitAppointment() {
    if (this.appointmentForm.valid) {
      let inputDate: any = this.appointmentForm.value.date?.toString()
      let request = {
        owner: this.currentUser,
        type: this.appointmentForm.value.type,
        pet: this.appointmentForm.value.pet,
        vet: this.appointmentForm.value.vet,
        date: this.getFormattedDate(inputDate),
        startTime: this.appointmentForm.value.time,
        description: this.appointmentForm.value.description,
        status: this.appointmentForm.value.status,
        duration: this.duration
      }
      this.appointmentService.createAppointment(request).subscribe(res => {
        this.toastr.success('Успешно запазен час!');
        this.router.navigate(['owner-profile-page']);
      });
    } else {
      this.toastr.warning("Некоректни данни!!!");
    }
  }
}
