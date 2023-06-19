import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface User {
  id: number;
  fullName: string;
  address: string;
  email: string;
  phoneNum: string;
  username: string;
  password: string;
  speciality: string;
  universityInfo: string;
  birthDate: string;
  photoUrl: string;
}

export class UserRequest {
  constructor(
    public fullName: string,
    public address: string,
    public phoneNum: string,
    public email: string,
    public username: string,
    public password: string
  ) {
  }
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl2 = 'http://localhost:8080/user/auth/vets';

  constructor(private http: HttpClient) {
  }

  getAllVets(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl2}`);
  }

}
