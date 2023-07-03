import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ArticleService} from "../../service/article/article.service";

@Component({
  selector: 'app-add-article-popup',
  templateUrl: './add-article-popup.component.html',
  styleUrls: ['./add-article-popup.component.css']
})
export class AddArticlePopupComponent {
  constructor(private builder: FormBuilder,
              private service: ArticleService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog: MatDialogRef<AddArticlePopupComponent>) {

  }
  addForm = this.builder.group({
    title: this.builder.control(''),
    description: this.builder.control(''),
  });

  add() {
    if (this.addForm.valid) {
      let request = {
        title: this.addForm.value.title,
        description: this.addForm.value.description,
      }
      console.log(request)
      this.service.createArticle(request).subscribe(res => {
        this.toastr.success('Успешно добавяне!');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Грешка!')
    }
  }
}
