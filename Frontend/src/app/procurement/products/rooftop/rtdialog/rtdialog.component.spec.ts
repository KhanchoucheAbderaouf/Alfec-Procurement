import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtdialogComponent } from './rtdialog.component';

describe('RtdialogComponent', () => {
  let component: RtdialogComponent;
  let fixture: ComponentFixture<RtdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
