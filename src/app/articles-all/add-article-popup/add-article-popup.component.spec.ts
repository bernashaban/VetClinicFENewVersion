import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlePopupComponent } from './add-article-popup.component';

describe('AddArticlePopupComponent', () => {
  let component: AddArticlePopupComponent;
  let fixture: ComponentFixture<AddArticlePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArticlePopupComponent]
    });
    fixture = TestBed.createComponent(AddArticlePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
