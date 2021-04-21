import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApdialogComponent } from './apdialog.component';

describe('ApdialogComponent', () => {
  let component: ApdialogComponent;
  let fixture: ComponentFixture<ApdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
