import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcdialogComponent } from './vcdialog.component';

describe('VcdialogComponent', () => {
  let component: VcdialogComponent;
  let fixture: ComponentFixture<VcdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
