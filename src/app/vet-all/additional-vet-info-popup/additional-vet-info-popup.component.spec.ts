import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalVetInfoPopupComponent } from './additional-vet-info-popup.component';

describe('AdditionalVetInfoPopupComponent', () => {
  let component: AdditionalVetInfoPopupComponent;
  let fixture: ComponentFixture<AdditionalVetInfoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalVetInfoPopupComponent]
    });
    fixture = TestBed.createComponent(AdditionalVetInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
