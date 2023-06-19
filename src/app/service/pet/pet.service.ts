import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user/user.service";

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
  private petId = new BehaviorSubject<string>("default id");
  currentId = this.petId.asObservable();

  constructor(private http: HttpClient) {
  }

  changePetId(petId: string) {
    this.petId.next(petId);
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl(''),
    //name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    age: new FormControl(''),
    gender: new FormControl(''),
    type: new FormControl(),

  });

  initFormGroup() {
    this.form.setValue({
      $key: null,
      owner: '',
      name: '',
      age: '',
      type: '',
      gender:''
    });
  }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}`);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  createPet(pet: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}`, pet);
  }

  // updatePet(id: number, pet: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, pet);
  // }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPetsByOwner(ownerId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl2}/${ownerId}`);
  }

}
