import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Pet, PetRequest, PetService} from "../../service/pet/pet.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User, UserService} from "../../service/user/user.service";
import {Appointment, AppointmentService} from "../../service/appointment/appointment.service";
import {AuthService} from "../../service/auth/auth.service";
import {AuthGuard} from "../../guard/auth.guard";

@Component({
  selector: 'app-owner-profile-page',
  templateUrl: './owner-profile-page.component.html',
  styleUrls: ['./owner-profile-page.component.css']
})
export class OwnerProfilePageComponent implements OnInit {


  currentUser: User;
  pets: Pet[];
  appointments: Appointment[];
  displayedColumnsForPet: string[]= ['name','age','gender', 'type','actions'];
  displayedColumnsForAppointment: string[]= ['pet','vet','date', 'status','actions'];

  constructor(private service: AuthService,
              private guard: AuthGuard,
              private router: Router,
              private userService: UserService,
              private petService: PetService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getUserPets();
    this.getUserAppointments();
  }

  getUserInfo(): void {
    this.service.getByUsername("berna").subscribe(
      (response: any) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  onLogoutClicked() {
    this.router.navigate(['/login']);
  }
  onAddPetClicked() {
    this.router.navigate(['/add-pet']);
  }
  getUserPets(): void {
    this.petService.getPetsByOwner(1).subscribe(
      (response: Pet[]) => {
        this.pets = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  getUserAppointments(): void {
    this.appointmentService.getAllAppointmentsForOwner(1).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  girlOrBoy(ordinal: number): string {
    if (ordinal == 1) {
      return "мъжки"
    } else {
      return "женски"
    }
  }

  petType(ordinal: number): string {
    switch (ordinal) {
      case 1:
        return "котка";
      case 2:
        return "куче";
      case 3:
        return "заек";
      default:
        return "друго";
    }
  }
  onDelete(id: number) {
    this.petService.deletePet(id).subscribe((data) =>
      this.getUserPets()
    );
  }
  prettyDate(date:string):string{
    return this.appointmentService.getPrettyDateTime(date);
  }

  getStatus(status:string):string{
    switch (status){
      case "UPCOMING":
        return "предстоящ";
      case "PASSED":
        return "минал";
      default:
        return "отменен";
    }
  }
  onChange(
    // name: string,
    // age:number,
    // gender:string,
    // type:string

  ) {
    // this.petService.createPet(new PetRequest(this.currentUserId, name,age,gender,type)).subscribe((data) =>
    //   this.getUserPets()
    // );
  }
}
