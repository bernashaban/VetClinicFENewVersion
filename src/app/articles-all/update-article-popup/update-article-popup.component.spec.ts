import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticlePopupComponent } from './update-article-popup.component';

describe('UpdateArticlePopupComponent', () => {
  let component: UpdateArticlePopupComponent;
  let fixture: ComponentFixture<UpdateArticlePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateArticlePopupComponent]
    });
    fixture = TestBed.createComponent(UpdateArticlePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
