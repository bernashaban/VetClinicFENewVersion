import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

export interface Article {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
}

export class ArticleRequest {
  constructor(
    title: string,
    description: string,
    photoUrl: string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:8080/article';
  private articleId = new BehaviorSubject<string>("default id");
  currentId = this.articleId.asObservable();

  constructor(private http: HttpClient) {
  }

  changeArticleId(articleId: string) {
    this.articleId.next(articleId);
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    description: new FormControl(''),
    photoUrl: new FormControl(),

  });

  initFormGroup() {
    this.form.setValue({
      $key: null,
      title: '',
      description: '',
      photoUrl: ''
    });
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

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
