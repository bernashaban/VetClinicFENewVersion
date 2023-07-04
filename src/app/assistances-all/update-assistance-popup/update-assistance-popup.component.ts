import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {AssistanceService} from "../../service/assistance/assistance.service";

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-update-assistance-popup',
  templateUrl: './update-assistance-popup.component.html',
  styleUrls: ['./update-assistance-popup.component.css']
})
export class UpdateAssistancePopupComponent implements OnInit {

  types: Type[] = [
    {value: 'REVIEWS', viewValue: 'Прегледи'},
    {value: 'PREVENTIVE', viewValue: 'Прегледи'},
    {value: 'MANIPULATIONS', viewValue: 'Манипулации'},
    {value: 'RESEARCH', viewValue: 'Изследвания'},
    {value: 'PACKAGED_SERVICES', viewValue: 'Пакетни услуги'},
    {value: 'CASTRATIONS', viewValue: 'Кастрации'},
    {value: 'ULTRASOUND', viewValue: 'Ехография'},
    {value: 'SURGERY', viewValue: 'Хирургия'},
    {value: 'DENTISTRY', viewValue: 'Стоматология'},
  ];
  constructor(private builder: FormBuilder,
              private service: AssistanceService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog:MatDialogRef<UpdateAssistancePopupComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.service.getAssistanceById(this.data.id).subscribe(res => {
        this.editData = res;
        this.updateForm.setValue({
          serviceType: this.editData.serviceType, name:this.editData.name, price:this.editData.price
        })
      });
    }
  }

  updateForm = this.builder.group({
    serviceType: this.builder.control(''),
    name: this.builder.control(''),
    price: this.builder.control('')
  });

  update() {
      this.service.updateAssistance(this.updateForm.value, this.data.id).subscribe(res=>{
        this.toastr.success('Успешно обновяване!');
        this.dialog.close();
      });
  }
}
