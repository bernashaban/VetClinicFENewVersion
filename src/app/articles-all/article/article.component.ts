import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../service/article/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}
