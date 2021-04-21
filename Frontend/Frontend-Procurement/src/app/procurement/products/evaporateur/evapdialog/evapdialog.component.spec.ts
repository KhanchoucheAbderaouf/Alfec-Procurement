import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapdialogComponent } from './evapdialog.component';

describe('EvapdialogComponent', () => {
  let component: EvapdialogComponent;
  let fixture: ComponentFixture<EvapdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
