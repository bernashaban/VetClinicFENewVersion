import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {PetService} from "../../service/pet/pet.service";

@Component({
  selector: 'app-add-pet-popup',
  templateUrl: './add-pet-popup.component.html',
  styleUrls: ['./add-pet-popup.component.css']
})
export class AddPetPopupComponent {
  types: any
  genders: any

  constructor(private builder: FormBuilder,
              private service: PetService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<AddPetPopupComponent>) {
    this.types = ['котка', 'куче', 'заек', 'друго'];
    this.genders = ['мъжки', 'женски'];
  }

  addForm = this.builder.group({
    name: this.builder.control(''),
    age: this.builder.control('', Validators.pattern("^[0-9]*$"),),
    type: this.builder.control(''),
    gender: this.builder.control(''),
  });

  add() {
    if (this.addForm.valid) {
      let request = {
        owner: {
          id: this.data.ownerId
        },
        name: this.addForm.value.name,
        age: this.addForm.value.age,
        type: this.setType(this.addForm.value.type),
        gender: this.setGender(this.addForm.value.gender)
      }
      console.log(request)
      this.service.createPet(request).subscribe(res => {
        console.log(res)
        this.toastr.success('Успешно добавяне!');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Грешка!')
    }
  }

  //  CAT - 1
  //  DOG - 2
  //  RABBIT - 3
  //  OTHER - 4
  setType(type: any) {
    let ordinal: number;
    if (type == "котка") {
      ordinal = 1
    } else if (type == "куче") {
      ordinal = 2
    } else if (type == "заек") {
      ordinal = 3
    } else {
      ordinal = 4
    }
    return ordinal
  }

  setGender(gender: any) {
    let ordinal: number;
    if (gender == "мъжки") {
      ordinal = 1
    } else {
      ordinal = 2
    }
    return ordinal
  }
}
