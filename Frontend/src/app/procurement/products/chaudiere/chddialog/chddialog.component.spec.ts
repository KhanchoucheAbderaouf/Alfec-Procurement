import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChddialogComponent } from './chddialog.component';

describe('ChddialogComponent', () => {
  let component: ChddialogComponent;
  let fixture: ComponentFixture<ChddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChddialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
