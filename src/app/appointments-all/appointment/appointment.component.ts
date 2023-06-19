import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../../service/appointment/appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }
}
