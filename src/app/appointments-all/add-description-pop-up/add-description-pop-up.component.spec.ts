import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDescriptionPopUpComponent } from './add-description-pop-up.component';

describe('AddDescriptionPopUpComponent', () => {
  let component: AddDescriptionPopUpComponent;
  let fixture: ComponentFixture<AddDescriptionPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDescriptionPopUpComponent]
    });
    fixture = TestBed.createComponent(AddDescriptionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
