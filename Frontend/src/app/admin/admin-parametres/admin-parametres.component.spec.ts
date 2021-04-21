import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParametresComponent } from './admin-parametres.component';

describe('AdminParametresComponent', () => {
  let component: AdminParametresComponent;
  let fixture: ComponentFixture<AdminParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParametresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
