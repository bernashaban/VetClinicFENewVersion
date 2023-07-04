import {Component, DoCheck, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Article, ArticleService} from "../../service/article/article.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {AddArticlePopupComponent} from "../add-article-popup/add-article-popup.component";
import {UpdateArticlePopupComponent} from "../update-article-popup/update-article-popup.component";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements DoCheck{
  public articles: Article[] = [];
  isVetOrAdmin = false;

  constructor(public service: ArticleService,
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
      this.displayedColumns = ['title', 'description', 'action'];
    }else{
      this.displayedColumns = ['title', 'description'];
    }
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  searchKey: string;


  loadList() {
    this.service.getAllArticles().subscribe(res => {
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
    this.list.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.service.deleteArticle(id).subscribe((data) =>
      this.loadList()
    );
    this.toastr.success('Успешно изтриване!');
  }

  update(id: any) {
    const popup = this.dialog.open(UpdateArticlePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '50%',
      data: {
        id: id
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadList();
    })
  }
  add() {
    const popup = this.dialog.open(AddArticlePopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
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
