import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css']
})
export class VetListComponent implements OnInit {

  // public veterinarians: Veterinarian[] = [];
  //
  // constructor(public service: VeterinarianService) {
  //   this.listData = new MatTableDataSource<Veterinarian>();
  //   this.sort = new MatSort();
  //   this.searchKey = '';
  //
  // }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]= ['fullName', 'speciality', 'universityInfo', 'birthDate', 'email', 'username','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    // this.service.getAllVets().subscribe(
    //   (response: Veterinarian[]) => {
    //     let array = this.veterinarians = response;
    //     this.listData = new MatTableDataSource(array);
    //     this.listData.sort = this.sort;
    //     this.listData.paginator = this.paginator;
    //   },
    //   (error:HttpErrorResponse) =>{
    //     alert(error.message);
    //   });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    // this.service.deleteVet(id).subscribe((data) =>
    //   this.getPets()
    // );
  }
  prettyDate(date:string):string{
    return "";
    //return this.service.getPrettyDate(date);
  }
}
