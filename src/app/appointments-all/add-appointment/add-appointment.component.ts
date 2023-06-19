import {Component, OnInit} from '@angular/core';
import {Appointment, AppointmentRequest, AppointmentService} from "../../service/appointment/appointment.service";

import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User, UserService} from "../../service/user/user.service";
import {Pet, PetService} from "../../service/pet/pet.service";


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  //we have to know who the logged user is, to take the pet list
  addAppointmentForm: FormGroup;
  dateTimeMap: Map<string, string[]>;
  pets: Pet[] = [];
  vets: User[] = [];
  selectedPet: any;
  selectedVetId: any;
  selectedDate:any;
  selectedTime:any;
  isDisabled: boolean;
  currentUserId:any = 1;

  selectPet(){
    console.log(this.selectedPet)
    console.log("This is from select pet")
  }

  selectVet() {
    console.log('Selected vet:', this.selectedVetId);
  }

  selectDate() {
    console.log('Selected Date:', this.selectedDate);
  }

  selectTime() {
    console.log('Selected Time:', this.selectedTime);
  }

  constructor(public appointmentService: AppointmentService,
              public petService: PetService,
              public userService: UserService,
              private formBuilder: FormBuilder, private router: Router) {
   // this.dateTimeMap = new Map<string,string[]>();
  }

  ngOnInit(): void {
      this.addAppointmentForm = this.formBuilder.group({
        pet: [''],
        vet: [''],
        date: [''],
        time: [''],
      });
    this.getPets();
    this.getVets();
    this.getFreeAppointments();
    this.disableDate();
  }



  disableDate(): any {
    console.log(this.selectedVetId)
    if(this.selectedVetId) {
     this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  getFreeAppointments(): void {
    // this.appointmentService.getFreeHours(this.selectedVetId).subscribe(
    //   (response: Map<string, string[]>) => {
    //     this.dateTimeMap = response;
    //   },
    //   (error:HttpErrorResponse) =>{
    //     alert(error.message);
    //   });
    this.dateTimeMap = new Map<string, string[]>();

      this.dateTimeMap.set('2023-06-01', ['9:00', '11:30', '2:00']);
      this.dateTimeMap.set('2023-06-02', ['10:00', '12:30', '3:00']);
      this.dateTimeMap.set('2023-06-03', ['11:00', '12:30', '5:00']);

  }

  getPets(): void {
    this.petService.getPetsByOwner(this.currentUserId).subscribe(
      (response: Pet[]) => {
        this.pets = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }

  getVets(): void {
    this.userService.getAllVets().subscribe(
      (response: User[]) => {
        this.vets = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }

  onAppointmentSubmit() {
    const pet = this.addAppointmentForm.controls['pet'].value
    const vet = this.addAppointmentForm.controls['vet'].value
    const date = this.addAppointmentForm.controls['date'].value
    const time = this.addAppointmentForm.controls['time'].value
    //
    // let appoinmentRequest = new AppointmentRequest()
    //
    // this.service.createAppointment(appoinmentRequest).subscribe(
    //   response => console.log(response),
    //   error => console.log(error)
    // );
    this.router.navigate(['/home'])
  }

  prettyDate(date:string):string{
    let day = date.substring(8, 10);
    let month = date.substring(5,7);
    let year = date.substring(0,4);
    return day + "." + month + "." + year
  }
  prettyTime(date:string):string{
    let hour =  date.substring(0,2);
    let minute= date.substring(3,5);
    return hour + ":" + minute;
  }

}
