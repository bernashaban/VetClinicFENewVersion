import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {PetRequest, PetService} from "../service/pet/pet.service";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  addPetForm: FormGroup;
  name: string;
  age: number;
  selectedGender: any;
  selectedType: any;
  currentUserId: number = 1;

  constructor(public petService: PetService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.addPetForm = this.formBuilder.group({
      name: [''],
      age: [''],
      gender: [''],
      type: [''],
    });
  }

  selectGender() {
    console.log('Selected vet:', this.selectedGender);
  }

  selectType() {
    console.log('Selected Date:', this.selectedType);
  }

  onPetSubmit() {
    const name = this.addPetForm.controls['name'].value
    console.log(name)
    const age = this.addPetForm.controls['age'].value
    console.log(age)
    let gender
    let type
    switch (this.addPetForm.controls['gender'].value) {
      case "мъжки":
        gender = 1;
        break;
      case "женски" :
        gender = 2;
    }
    switch (this.addPetForm.controls['type'].value) {
      case "котка":
        type = 1;
        break;
      case "куче":
        type = 2;
        break;
      case "заек":
        type = 3;
        break;
      default: 4;
    }

    let petRequest = new PetRequest(this.currentUserId, name, age, type, gender)

    console.log(petRequest)

    this.petService.createPet(petRequest).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
    this.router.navigate(['/owner-profile-page'])
  }
}
