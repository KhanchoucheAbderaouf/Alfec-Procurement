import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChdcreateComponent } from './chdcreate.component';

describe('ChdcreateComponent', () => {
  let component: ChdcreateComponent;
  let fixture: ComponentFixture<ChdcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChdcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChdcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
