import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PetService} from "../../service/pet/pet.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../service/user/user.service";
import {AppointmentService} from "../../service/appointment/appointment.service";
import {AuthService} from "../../service/auth/auth.service";
import {AuthGuard} from "../../guard/auth.guard";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AddAssistancePopupComponent} from "../../assistances-all/add-assistance-popup/add-assistance-popup.component";
import {AddPetPopupComponent} from "../../pet-all/add-pet-popup/add-pet-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePetPopupComponent} from "../../pet-all/update-pet-popup/update-pet-popup.component";

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-owner-profile-page',
  templateUrl: './owner-profile-page.component.html',
  styleUrls: ['./owner-profile-page.component.css']
})
export class OwnerProfilePageComponent {
  types: Type[] = [
    {value: 'REVIEWS', viewValue: 'Прегледи'},
    {value: 'PREVENTIVE', viewValue: 'Профилактични'},
    {value: 'MANIPULATIONS', viewValue: 'Манипулации'},
    {value: 'RESEARCH', viewValue: 'Изследвания'},
    {value: 'PACKAGED_SERVICES', viewValue: 'Пакетни услуги'},
    {value: 'CASTRATIONS', viewValue: 'Кастрации'},
    {value: 'ULTRASOUND', viewValue: 'Ехография'},
    {value: 'SURGERY', viewValue: 'Хирургия'},
    {value: 'DENTISTRY', viewValue: 'Стоматология'},
  ];
  currentUser: any;
  pets: any;
  petsDataSource:any;
  upcomingAppointments: any;
  upcomingAppointmentsDataSource: any;
  passedAppointments: any;
  passedAppointmentsDataSource: any;
  displayedColumnsForPet: string[] = ['name', 'age', 'gender', 'type', 'actions'];
  displayedColumnsForUpcomingAppointment: string[] = ['pet', 'vet', 'date', 'time','type', 'duration', 'actions'];
  displayedColumnsForPassedAppointment: string[] = ['pet', 'vet', 'date', 'type', 'description'];
times:any;
  constructor(private service: AuthService,
              private guard: AuthGuard,
              private router: Router,
              private dialog: MatDialog,
              private userService: UserService,
              private petService: PetService,
              private appointmentService: AppointmentService) {
    this.getUserInfo();
    this.getUserPets();
    this.getUpcomingAppointments();
    this.getPassedAppointments();
    this.times = ["9:00","9:30", "10:00", "11:30", "13:00","13:30", "14:30", "15:00", "16:30", "17:00"]
  }

  getRandomTime(){
    let random = Math.round(Math.random() * 10);
    return this.times[random]
  }
  @ViewChild(MatPaginator) petsPaginator !: MatPaginator
  @ViewChild(MatSort) petSort !: MatSort

  @ViewChild(MatPaginator) upcAppPaginator !: MatPaginator
  @ViewChild(MatSort) upcAppSort !: MatSort

  @ViewChild(MatPaginator) passAppPaginator !: MatPaginator
  @ViewChild(MatSort) passAppSort !: MatSort
  searchKey: string;

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.passedAppointmentsDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getUserInfo(): void {
    this.service.getByUsername(this.service.getLoggedIn()).subscribe(
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
    const popup = this.dialog.open(AddPetPopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
    })
    popup.afterClosed().subscribe(res=>{
      this.getUserPets();
    })
  }

  getUserPets(): void {
    this.petService.getPetsByOwner(1).subscribe(
      (response: any) => {
        this.pets = response;
        this.petsDataSource = new MatTableDataSource(this.pets)
        this.petsDataSource.paginator = this.petsPaginator
        this.petsDataSource.sort = this.petSort
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  getUpcomingAppointments(): void {
    this.appointmentService.getAllAppointmentsForOwner(1, "UPCOMING").subscribe(
      (response: any) => {
        this.upcomingAppointments = response;
        this.upcomingAppointmentsDataSource = new MatTableDataSource(this.upcomingAppointments)
        this.upcomingAppointmentsDataSource.paginator = this.upcAppPaginator
        this.upcomingAppointmentsDataSource.sort = this.upcAppSort
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  getPassedAppointments(): void {
    this.appointmentService.getAllAppointmentsForOwner(1, "PASSED").subscribe(
      (response: any) => {
        this.passedAppointments = response;
        this.passedAppointmentsDataSource = new MatTableDataSource(this.passedAppointments)
        this.passedAppointmentsDataSource.paginator = this.passAppPaginator
        this.passedAppointmentsDataSource.sort = this.passAppSort
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

  update(id: number) {
    const popup = this.dialog.open(UpdatePetPopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        id:id
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.getUserPets();
    })
  }

  onDelete(id: number) {
    this.petService.deletePet(id).subscribe((data) =>
      this.getUserPets()
    );
  }

  prettyDate(date: string): string {
    let day = date.substring(8);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return day + "." + month + "." + year+ "г.";
  }

  getBgType(type: any) {
    for (let i = 0; i < this.types.length; i++) {
      let currentTypeValue = this.types[i].value;
      if(currentTypeValue === type){
        return this.types[i].viewValue;
      }
    }
    return null;
  }

  getFormattedDescription(description: string) {
    let stringArray = description.split(";")
    let formatted = "";
    for (let i = 0; i < stringArray.length; i++) {
      let currentLine = stringArray[i];
      formatted= formatted+currentLine+";"+'\n';
    }
    return formatted
  }
}
