import { Component, OnInit } from '@angular/core';
import {Pet, PetService} from "../../service/pet/pet.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  private petIdToSend = new BehaviorSubject<string>('');

  pets: Pet[] = [];

  constructor(private service: PetService, private router:Router ) {}

  ngOnInit(): void {
  }

  onClear(){
    this.service.form.reset();
    this.service.form.setValue({
      $key:null,
      name:'',
      age:''
    });
  }

  onSubmit(){
    let pet = {
      ownerId: this.service.form.controls["ownerId"].value,
      name: this.service.form.controls["name"].value,
      age: this.service.form.controls["age"].value,
      type: this.service.form.controls["type"].value,
      gender: this.service.form.controls["gender"].value,
    }
    this.service.createPet(pet).subscribe((data)=>{
      this.router.navigate(['/list-pets'])
    });
    this.service.form.reset();
  }
}
