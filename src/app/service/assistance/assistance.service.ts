import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Assistance {
  id: number;
  serviceType: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  private apiUrl = 'http://localhost:8080/assistance';

  constructor(private http: HttpClient) {
  }

  getAllAssistances(): Observable<Assistance[]> {
    return this.http.get<Assistance[]>(`${this.apiUrl}`);
  }

  getAssistanceById(id: number): Observable<Assistance> {
    return this.http.get<Assistance>(`${this.apiUrl}/${id}`);
  }

  createAssistance(assistance: any): Observable<Assistance> {
    return this.http.post<Assistance>(`${this.apiUrl}`, assistance);
  }

  updateAssistance(assistance: any, id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, assistance);
  }

  deleteAssistance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
