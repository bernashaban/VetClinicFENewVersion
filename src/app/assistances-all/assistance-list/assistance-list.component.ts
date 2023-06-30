import {Component, DoCheck, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Assistance, AssistanceService} from "../../service/assistance/assistance.service";
import {MatDialog} from "@angular/material/dialog";
import {AddAssistancePopupComponent} from "../add-assistance-popup/add-assistance-popup.component";
import {AuthService} from "../../service/auth/auth.service";
import {UpdateAssistancePopupComponent} from "../update-assistance-popup/update-assistance-popup.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent implements DoCheck{
  public assistances: Assistance[] = [];
  isVetOrAdmin = false;

  constructor(public service: AssistanceService,
              private dialog: MatDialog,
              private authService: AuthService,
              private toastr:ToastrService) {
    this.loadList();
  }

  list: any;
  dataSource: any;
  displayedColumns: string[];
  setDisplayedColumns(){
    if(this.isVetOrAdmin){
      this.displayedColumns = ['name', 'type', 'price', 'action'];
    }else{
      this.displayedColumns = ['name', 'type', 'price'];
    }
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  searchKey: string;

  loadList() {
    this.service.getAllAssistances().subscribe(res => {
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
    this.toastr.success('Успешно изтриване!');
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

  add() {
    const popup = this.dialog.open(AddAssistancePopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
    })
    popup.afterClosed().subscribe(res=>{
      this.loadList();
    })
  }

  update(id:number) {
    const popup = this.dialog.open(UpdateAssistancePopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        id:id
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadList();
    })
  }


  ngDoCheck(): void {
    if(this.authService.getUserRole()=="ROLE_VET" || this.authService.getUserRole()=="ROLE_VET,ROLE_ADMIN"){
      this.isVetOrAdmin = true;
    }
    this.setDisplayedColumns();
  }

}
