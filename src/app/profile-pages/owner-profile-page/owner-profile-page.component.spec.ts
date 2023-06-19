import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProfilePageComponent } from './owner-profile-page.component';

describe('OwnerProfilePageComponent', () => {
  let component: OwnerProfilePageComponent;
  let fixture: ComponentFixture<OwnerProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
