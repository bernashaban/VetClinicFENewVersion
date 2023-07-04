import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-popup-personal-info',
  templateUrl: './update-popup-personal-info.component.html',
  styleUrls: ['./update-popup-personal-info.component.css']
})
export class UpdatePopupPersonalInfoComponent implements OnInit{
  constructor(private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<UpdatePopupPersonalInfoComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.getByUsername(this.data.username).subscribe(res => {
        this.editData = res;
        console.log(res)
        this.updateForm.setValue({
          username:this.editData.username, fullName:this.editData.fullName,
          password: this.editData.password, email:this.editData.email, phoneNum: this.editData.phoneNum, address: this.editData.address
        })
      });
    }
  }

  updateForm = this.builder.group({
    username: this.builder.control(''),
    fullName: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    phoneNum: this.builder.control(''),
    address: this.builder.control(''),
  });

  updateUser() {
    let request = {
      username: this.updateForm.value.username,
      password: this.updateForm.value.password,
      email: this.updateForm.value.email,
      phoneNum: this.updateForm.value.phoneNum,
      fullName: this.updateForm.value.fullName,
      address: this.updateForm.value.address,
      active: 1,
    }
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
