import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {AppointmentService} from "../../service/appointment/appointment.service";

@Component({
  selector: 'app-add-description-pop-up',
  templateUrl: './add-description-pop-up.component.html',
  styleUrls: ['./add-description-pop-up.component.css']
})
export class AddDescriptionPopUpComponent implements OnInit {
  constructor(private builder: FormBuilder,
              private service: AppointmentService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog:MatDialogRef<AddDescriptionPopUpComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.service.getAppointmentById(this.data.id).subscribe(res => {
        this.editData = res;
      });
    }
  }

  updateForm = this.builder.group({
    input1:this.builder.control(''),
    input2:this.builder.control(''),
    input3:this.builder.control(''),
  });

  update() {
    let request = "Диагноза:"+this.updateForm.value.input1+";"+
      "Манипулация:"+this.updateForm.value.input2+";"+
      "Медикаменти:"+this.updateForm.value.input3+";";

    this.service.addDescription(request, this.data.id).subscribe(res=>{
      this.toastr.success('Успешно добавяне на описание!');
      this.dialog.close();
    });
  }
}
