import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetPopupComponent } from './add-pet-popup.component';

describe('AddPetPopupComponent', () => {
  let component: AddPetPopupComponent;
  let fixture: ComponentFixture<AddPetPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPetPopupComponent]
    });
    fixture = TestBed.createComponent(AddPetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
