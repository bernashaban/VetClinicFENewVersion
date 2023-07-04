import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-additional-vet-info-popup',
  templateUrl: './additional-vet-info-popup.component.html',
  styleUrls: ['./additional-vet-info-popup.component.css']
})
export class AdditionalVetInfoPopupComponent {
  constructor(private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<AdditionalVetInfoPopupComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.getByUsername(this.data.username).subscribe(res => {
        this.editData = res;
        this.updateForm.setValue({
          photoUrl:this.editData.photoUrl, speciality:this.editData.speciality,
          universityInfo: this.editData.universityInfo, birthDate:this.editData.birthDate
        })
      });
    }
  }

  updateForm = this.builder.group({
    photoUrl: this.builder.control(''),
    speciality: this.builder.control(''),
    universityInfo: this.builder.control(''),
    birthDate: this.builder.control(''),
  });

  updateUser() {
    let request = {
      photoUrl: this.updateForm.value.photoUrl,
      speciality: this.updateForm.value.speciality,
      universityInfo: this.updateForm.value.universityInfo,
      birthDate: this.updateForm.value.birthDate,
      active: 1,
    }
    console.log(request)
    if(this.updateForm.valid){
      this.service.update(this.data.username,  request).subscribe(res=>{
        this.toastr.success('Успешно обновяване!');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Моля изберете права!')
    }
  }

}
