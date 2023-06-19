import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Pet} from "../pet/pet.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../user/user.service";

export interface Appointment {
  id: number;
  owner: User;
  pet: Pet;
  veterinarian: User;
  dateTime: string;
  description: string;
  status: string;
}

export class AppointmentRequest {
  constructor(
    public owner: User,
    public pet: Pet,
    public veterinarian: User,
    public dateTime: string,
    public description: string,
    public status: string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8080/appointment';
  private apiUrlOwner = 'http://localhost:8080/appointment/owner';
  private apiUrlVet = 'http://localhost:8080/appointment/vet';
  private appointmentId = new BehaviorSubject<string>("default id");
  currentId = this.appointmentId.asObservable();
  private status = "UPCOMING";
  constructor(private http: HttpClient) {
  }

  changeAppointmentId(appointmentId: string) {
    this.appointmentId.next(appointmentId);
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    owner: new FormControl(''),
    pet: new FormControl(''),
    dateTime: new FormControl(''),
    veterinarian: new FormControl(),
    description: new FormControl(),
    status: new FormControl(),

  });

  initFormGroup() {
    this.form.setValue({
      $key: null,
      owner:'',
      pet: '',
      dateTime: '',
      veterinarian: '',
      description: '',
      status: ''
    });
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}`);
  }
  getAllAppointmentsForOwner(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrlOwner}/${id}`);
  }
  getAllAppointmentsForVet(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrlVet}/${id}`);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: AppointmentRequest): Observable<any> {
    return this.http.post<Appointment>(`${this.apiUrl}`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFreeHours(vetId:number):Observable<Map<string, string[]>>{
    return this.http.get<Map<string, string[]>>(`${this.apiUrl}/${vetId}/${this.status}`);
  }

  //0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
  //2 0 2 3 - 0 5 - 3 1 T  1  1  :  0  0  :  00
  //31.05.2023 - 11:00
  getPrettyDateTime(date:string): string{
    let day = date.substring(8, 10);
    let month = date.substring(5,7);
    let year = date.substring(0,4);
    let hour =  date.substring(11,13);
    let minute= date.substring(14,16);
    return day + "." + month + "." + year + " - " + hour + ":" + minute;
  }
}
