import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetProfilePageComponent } from './vet-profile-page.component';

describe('VetProfilePageComponent', () => {
  let component: VetProfilePageComponent;
  let fixture: ComponentFixture<VetProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
