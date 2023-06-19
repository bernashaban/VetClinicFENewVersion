import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  // public owners: Owner[] = [];
  //
  // constructor(public service: OwnerService) {
  //   this.listData = new MatTableDataSource<Owner>();
  //   this.sort = new MatSort();
  //   this.searchKey = '';
  //
  // }

  listData: MatTableDataSource<any>;

  displayedColumns: string[]= ['fullName', 'address', 'email', 'phoneNum', 'username', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    // this.service.getAllOwners().subscribe(
    //   (response: Owner[]) => {
    //     let array = this.owners = response;
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
    // this.service.deleteOwner(id).subscribe((data) =>
    //   this.getPets()
    // );
  }


}
