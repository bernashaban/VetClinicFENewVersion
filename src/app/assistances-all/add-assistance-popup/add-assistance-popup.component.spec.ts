import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistancePopupComponent } from './add-assistance-popup.component';

describe('AddAssistancePopupComponent', () => {
  let component: AddAssistancePopupComponent;
  let fixture: ComponentFixture<AddAssistancePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssistancePopupComponent]
    });
    fixture = TestBed.createComponent(AddAssistancePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
