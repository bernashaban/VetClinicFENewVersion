import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  roles: any

  constructor(private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog:MatDialogRef<UpdatepopupComponent>) {
    this.service.getAllRoles().subscribe(res => {
      this.roles = res;
    });
  }

  editData: any

  ngOnInit(): void {
    if (this.data.username != null && this.data.username != '') {
      this.service.getByUsername(this.data.username).subscribe(res => {
        this.editData = res;
        console.log(res)
        this.updateForm.setValue({
          isActive: this.editData.active, username:this.editData.username, fullName:this.editData.fullName,
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
    roles: this.builder.control(''),
    isActive: this.builder.control(false),


  });

  updateUser() {
    if(this.updateForm.valid){
      this.service.update(this.updateForm.value.username, this.updateForm.value).subscribe(res=>{
        this.toastr.success('Updated successfully');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Please Select Role')
    }
  }

}
