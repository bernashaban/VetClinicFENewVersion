import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Pet {
  id: number;
  ownerId: number;
  name: string;
  age: number;
  type: number;
  gender: number;
}

export class PetRequest {
  constructor(
    public ownerId: number,
    public name: string,
    public age: number,
    public type: any,
    public gender: any,
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:8080/pet';
  private apiUrl2 = 'http://localhost:8080/pet/pets';

  constructor(private http: HttpClient) {
  }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}`);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  createPet(pet: any): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}`, pet);
  }

  updatePet(pet: any, id:any): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPetsByOwner(ownerId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl2}/${ownerId}`);
  }

}
