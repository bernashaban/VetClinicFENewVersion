import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssistancePopupComponent } from './update-assistance-popup.component';

describe('UpdateAssistancePopupComponent', () => {
  let component: UpdateAssistancePopupComponent;
  let fixture: ComponentFixture<UpdateAssistancePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAssistancePopupComponent]
    });
    fixture = TestBed.createComponent(UpdateAssistancePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
