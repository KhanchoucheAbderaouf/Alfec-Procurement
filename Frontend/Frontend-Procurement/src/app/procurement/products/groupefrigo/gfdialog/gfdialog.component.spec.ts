import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfdialogComponent } from './gfdialog.component';

describe('GfdialogComponent', () => {
  let component: GfdialogComponent;
  let fixture: ComponentFixture<GfdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
