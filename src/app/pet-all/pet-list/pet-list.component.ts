import {Component, OnInit, ViewChild} from '@angular/core';
import {Pet, PetService} from "../../service/pet/pet.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  public pets: Pet[] = [];

  constructor(public service: PetService) {
    this.listData = new MatTableDataSource<Pet>();
    this.sort = new MatSort();
    this.searchKey = '';

  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]= ['owner', 'type', 'age', 'gender', 'name', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.service.getAllPets().subscribe(
      (response: Pet[]) => {
        let array = this.pets = response;
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.service.deletePet(id).subscribe((data) =>
      this.getPets()
    );
  }
}
