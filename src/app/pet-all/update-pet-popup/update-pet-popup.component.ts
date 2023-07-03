import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {PetService} from "../../service/pet/pet.service";

@Component({
  selector: 'app-update-pet-popup',
  templateUrl: './update-pet-popup.component.html',
  styleUrls: ['./update-pet-popup.component.css']
})
export class UpdatePetPopupComponent implements OnInit {
  types:any
  genders:any
  constructor(private builder: FormBuilder,
              private service: PetService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog:MatDialogRef<UpdatePetPopupComponent>) {
    this.types = [ 'котка', 'куче', 'заек', 'друго'];
    this.genders =[ 'мъжки', 'женски'];
  }

  editData: any

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.service.getPetById(this.data.id).subscribe(res => {
        this.editData = res;
        console.log(res)
        this.updateForm.setValue({
          name: this.editData.name, age:this.editData.age,
          type:this.editData.type, gender:this.editData.gender
        })
      });
    }
  }

  updateForm = this.builder.group({
    name: this.builder.control(''),
    age: this.builder.control('',   Validators.pattern("^[0-9]*$"),),
    type: this.builder.control(''),
    gender: this.builder.control(''),
  });

  update() {
    this.service.updatePet(this.updateForm.value, this.data.id).subscribe(res=>{
      this.toastr.success('Успешно обновяване!');
      this.dialog.close();
    });
  }

}
