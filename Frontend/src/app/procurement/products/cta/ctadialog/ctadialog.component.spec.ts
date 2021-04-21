import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtadialogComponent } from './ctadialog.component';

describe('CtadialogComponent', () => {
  let component: CtadialogComponent;
  let fixture: ComponentFixture<CtadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
