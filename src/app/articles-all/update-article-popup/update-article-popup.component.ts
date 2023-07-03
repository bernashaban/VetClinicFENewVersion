import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ArticleService} from "../../service/article/article.service";

@Component({
  selector: 'app-update-article-popup',
  templateUrl: './update-article-popup.component.html',
  styleUrls: ['./update-article-popup.component.css']
})
export class UpdateArticlePopupComponent {
  constructor(private builder: FormBuilder,
              private service: ArticleService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              private dialog:MatDialogRef<UpdateArticlePopupComponent>) {
  }

  editData: any

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.service.getArticleById(this.data.id).subscribe(res => {
        this.editData = res;
        console.log(res)
        this.updateForm.setValue({
           title:this.editData.name, description:this.editData.price
        })
      });
    }
  }

  updateForm = this.builder.group({
    title: this.builder.control(''),
    description: this.builder.control('')
  });

  update() {
    this.service.updateArticle(this.updateForm.value, this.data.id).subscribe(res=>{
      this.toastr.success('Успешно обновяване!');
      this.dialog.close();
    });
  }
}
