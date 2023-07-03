import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePopupPersonalInfoComponent } from './update-popup-personal-info.component';

describe('UpdatePopupPersonalInfoComponent', () => {
  let component: UpdatePopupPersonalInfoComponent;
  let fixture: ComponentFixture<UpdatePopupPersonalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePopupPersonalInfoComponent]
    });
    fixture = TestBed.createComponent(UpdatePopupPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
