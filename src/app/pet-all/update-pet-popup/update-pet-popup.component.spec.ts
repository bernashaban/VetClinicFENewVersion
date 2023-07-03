import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePetPopupComponent } from './update-pet-popup.component';

describe('UpdatePetPopupComponent', () => {
  let component: UpdatePetPopupComponent;
  let fixture: ComponentFixture<UpdatePetPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePetPopupComponent]
    });
    fixture = TestBed.createComponent(UpdatePetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
