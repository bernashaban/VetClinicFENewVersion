import {Component, ViewChild} from '@angular/core';
import {Appointment, AppointmentService} from "../../service/appointment/appointment.service";
import {AuthService} from "../../service/auth/auth.service";
import {AuthGuard} from "../../guard/auth.guard";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {
  AddDescriptionPopUpComponent
} from "../../appointments-all/add-description-pop-up/add-description-pop-up.component";
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-vet-profile-page',
  templateUrl: './vet-profile-page.component.html',
  styleUrls: ['./vet-profile-page.component.css']
})
export class VetProfilePageComponent {

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
  upcomingAppointments: any;
  upcomingAppointmentsDataSource: any;
  passedAppointments: any;
  passedAppointmentsDataSource: any;
  waitingAppointments: any;
  waitingAppointmentsDataSource: any;
  displayedColumnsForUpcomingAppointment: string[] = ['pet', 'owner', 'date', 'time', 'type', 'duration', 'actions'];
  displayedColumnsForPassedAppointment: string[] = ['pet', 'owner', 'date', 'type', 'description', 'actions'];
  displayedColumnsForWaitingAppointment: string[] = ['pet', 'owner', 'date', 'type', 'actions'];

  times:any;

  constructor(private service: AuthService,
              private guard: AuthGuard,
              private router: Router,
              private dialog: MatDialog,
              private appointmentService: AppointmentService) {
    this.getUserInfo();
    this.getUpcomingAppointments();
    this.getPassedAppointments();
    this.getWaitingAppointments();
   this.times = ["9:00","9:30", "10:00", "11:30", "13:00","13:30", "14:30", "15:00", "16:30", "17:00"]
  }

  getRandomTime(){
    let random = Math.round(Math.random() * 10);
    return this.times[random]
  }
  @ViewChild(MatPaginator) upcAppPaginator !: MatPaginator
  @ViewChild(MatSort) upcAppSort !: MatSort

  @ViewChild(MatPaginator) passAppPaginator !: MatPaginator
  @ViewChild(MatSort) passAppSort !: MatSort

  @ViewChild(MatPaginator) wAppPaginator !: MatPaginator
  @ViewChild(MatSort) wAppSort !: MatSort
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

  getUpcomingAppointments(): void {
    this.appointmentService.getAllAppointmentsForVet(11, "UPCOMING").subscribe(
      (response: any) => {
        console.log("upcoming")
        console.log(response)
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
    this.appointmentService.getAllAppointmentsForVet(11, "PASSED").subscribe(
      (response: any) => {
        console.log("passed")
        console.log(response)
        this.passedAppointments = response;
        this.passedAppointmentsDataSource = new MatTableDataSource(this.passedAppointments)
        this.passedAppointmentsDataSource.paginator = this.passAppPaginator
        this.passedAppointmentsDataSource.sort = this.passAppSort
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  getWaitingAppointments(): void {

    this.appointmentService.getAllWaitingForDesc(11, "UPCOMING").subscribe(
      (response: any) => {
        console.log("waiting")
        console.log(response)
        this.waitingAppointments = response;
        this.waitingAppointmentsDataSource = new MatTableDataSource(this.waitingAppointments)
        this.waitingAppointmentsDataSource.paginator = this.wAppPaginator
        this.waitingAppointments.sort = this.wAppSort
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }


  onDelete(id: number) {
    // this.petService.deletePet(id).subscribe((data) =>
    //   this.getUserPets()
    // );
  }
  update(id: number) {
    // this.petService.deletePet(id).subscribe((data) =>
    //   this.getUserPets()
    // );
  }
  addDescription(id: number) {
    const popup = this.dialog.open(AddDescriptionPopUpComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        id:id
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.getWaitingAppointments();
      this.getPassedAppointments();
    })
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
      formatted= formatted+currentLine+'\n';
    }
    return formatted
  }
}
