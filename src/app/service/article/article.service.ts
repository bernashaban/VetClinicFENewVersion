import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Article {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
}

export class ArticleRequest {}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:8080/article';

  constructor(private http: HttpClient) {
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: ArticleRequest): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}`, article);
  }

  updateArticle(article: any, id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
