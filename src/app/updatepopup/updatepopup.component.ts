import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  roles: Role[] = [
    {value: 'ROLE_OWNER', viewValue: 'Потребител'},
    {value: 'ROLE_VET', viewValue: 'Ветеринар'},
    {value: 'ROLE_VET,ROLE_ADMIN', viewValue: 'Администратор'},
  ];

  constructor(private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<UpdatepopupComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.getByUsername(this.data.username).subscribe(res => {
        this.editData = res;
        this.updateForm.setValue({
          active: this.editData.active, username:this.editData.username, fullName:this.editData.fullName,
        password: this.editData.password, email:this.editData.email, roles:this.editData.roles
        })
      });
    }
  }

  updateForm = this.builder.group({
    username: this.builder.control(''),
    fullName: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    roles: this.builder.control('ROLE_OWNER'),
    active: this.builder.control(''),
  });

  updateUser() {
    let request = {
      roles: this.updateForm.value.roles,
      active:this.updateForm.value.active
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
