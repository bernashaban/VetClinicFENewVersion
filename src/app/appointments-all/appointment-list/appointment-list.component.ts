import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {Appointment, AppointmentService} from "../../service/appointment/appointment.service";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public appointments: Appointment[] = [];

  constructor(public service: AppointmentService) {
    this.listData = new MatTableDataSource<Appointment>();
    this.sort = new MatSort();
    this.searchKey = '';

  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]= ['owner','veterinarian','datetime', 'description', 'status','actions'];
  // displayedColumns: string[]= ['owner', 'pet', 'veterinarian', 'datetime', 'description', 'status','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.service.getAllAppointments().subscribe(
      (response: Appointment[]) => {
        let array = this.appointments = response;
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.service.deleteAppointment(id).subscribe((data) =>
      this.getAppointments()
    );
  }

  prettyDate(date:string):string{
    return this.service.getPrettyDateTime(date);
  }
}
