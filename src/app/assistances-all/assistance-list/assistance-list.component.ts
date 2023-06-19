import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {Assistance, AssistanceService} from "../../service/assistance/assistance.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatepopupComponent} from "../../updatepopup/updatepopup.component";

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent {
  public assistances: Assistance[] = [];

  constructor(public service: AssistanceService, private dialog: MatDialog) {
    this.loadList();
  }

  list: any;
  dataSource: any;
  displayedColumns: string[] = ['name', 'type', 'price', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  searchKey: string;

  loadList() {
    this.service.getAllAssistances().subscribe(res => {
      console.log(res)
      this.list = res;
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.service.deleteAssistance(id).subscribe((data) =>
      this.loadList()
    );
  }

  getServiceType(type: string): string {
    switch (type) {
      case "REVIEWS":
        return "Прегледи";
      case "PREVENTIVE":
        return "Профилактични";
      case "MANIPULATIONS":
        return "Манипулации";
      case "RESEARCH":
        return "Изследвания";
      case "PACKAGED_SERVICES":
        return "Пакетни услуги";
      case "CASTRATIONS":
        return "Кастрации";
      case "ULTRASOUND":
        return "Ехография";
      case "SURGERY":
        return "Хирургия";
      default:
        return "Стоматология";
    }
  }
  updateElement(username: any) {
    const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        username:username
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadList();
    })
  }

}
