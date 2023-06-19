import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {Article, ArticleService} from "../../service/article/article.service";
import {AssistanceService} from "../../service/assistance/assistance.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatepopupComponent} from "../../updatepopup/updatepopup.component";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  public articles: Article[] = [];

  constructor(public service: ArticleService, private dialog: MatDialog) {
    this.loadList();
  }

  list: any;
  dataSource: any;
  displayedColumns: string[] = ['title', 'description', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  searchKey: string;


  loadList() {
    this.service.getAllArticles().subscribe(res => {
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
    this.list.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.service.deleteArticle(id).subscribe((data) =>
      this.loadList()
    );
  }

  updateElement(username: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '50%',
      data: {
        username: username
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadList();
    })
  }

}
