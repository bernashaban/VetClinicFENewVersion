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
  selector: 'app-add-assistance-popup',
  templateUrl: './add-assistance-popup.component.html',
  styleUrls: ['./add-assistance-popup.component.css']
})
export class AddAssistancePopupComponent {
  types: Type[] = [
    {value: 'REVIEWS', viewValue: 'Прегледи'},
    {value: 'PREVENTIVE', viewValue: 'Профилактични'},
    {value: 'MANIPULATIONS', viewValue: 'Манипулации'},
    {value: 'RESEARCH', viewValue: 'Изследвания'},
    {value: 'PACKAGED_SERVICES', viewValue: 'Пакетни услуги'},
    {value: 'CASTRATIONS', viewValue: 'Кастрации'},
    {value: 'ULTRASOUND', viewValue: 'Ехография'},
    {value: 'SURGERY', viewValue: 'Хирургия'},
    {value: 'DENTISTRY', viewValue: 'Стоматология'},
  ];

  selectedType: any;

  constructor(private builder: FormBuilder,
              private service: AssistanceService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<AddAssistancePopupComponent>) {

  }

  addForm = this.builder.group({
    serviceType: this.builder.control(''),
    name: this.builder.control(''),
    price: this.builder.control(''),
  });

  add() {
    if (this.addForm.valid) {
      let request = {
        serviceType: this.addForm.value.serviceType,
        name: this.addForm.value.name,
        price: this.addForm.value.price,
      }
      console.log(request)
      this.service.createAssistance(request).subscribe(res => {
        this.toastr.success('Успешно добавяне!');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Грешка!')
    }
  }
}
