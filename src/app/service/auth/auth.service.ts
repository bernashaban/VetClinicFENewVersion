import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiUrl='http://localhost:8080/test'

  getAll(){
    return this.http.get(this.apiUrl);
  }

  getAllRoles(){
    return this.http.get(this.apiUrl+'/roles');
  }

  getByUsername(username:any){
    return this.http.get(this.apiUrl+'/'+username);
  }
  deleteById(id:any){
    return this.http.delete(this.apiUrl+'/id/'+id);
  }

  register(inputData:any){
    return this.http.post(this.apiUrl, inputData);
  }

  update(username:any, inputData:any){
    return this.http.put(this.apiUrl+'/'+username, inputData);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  getLoggedIn():string|null{
    return sessionStorage.getItem('username');
  }

  getUserRole(){
    return sessionStorage.getItem('roles')!=null ? sessionStorage.getItem('roles')?.toString():'';
  }

  getAllVets(){
    return this.http.get("http://localhost:8080/user/auth/vets");
  }
}
