import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

export interface Assistance {
  id: number;
  serviceType: string;
  name: string;
  price: number;
}

export class AssistanceRequest {
  constructor(
    public serviceType: string,
    public name: string,
    public price: number
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  private apiUrl = 'http://localhost:8080/assistance';
  private assistanceId = new BehaviorSubject<string>("default id");
  currentId = this.assistanceId.asObservable();

  constructor(private http: HttpClient) {
  }

  changeAssistanceId(assistanceId: string) {
    this.assistanceId.next(assistanceId);
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl(''),
    serviceType: new FormControl(''),
    price: new FormControl(),

  });

  initFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      serviceType: '',
      price: ''
    });
  }

  getAllAssistances(): Observable<Assistance[]> {
    return this.http.get<Assistance[]>(`${this.apiUrl}`);
  }

  getAssistanceById(id: number): Observable<Assistance> {
    return this.http.get<Assistance>(`${this.apiUrl}/${id}`);
  }

  createAssistance(assistance: AssistanceRequest): Observable<Assistance> {
    return this.http.post<Assistance>(`${this.apiUrl}`, assistance);
  }

  updateAssistance(assistance: Assistance): Observable<Assistance> {
    return this.http.put<Assistance>(`${this.apiUrl}`, assistance);
  }

  deleteAssistance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
