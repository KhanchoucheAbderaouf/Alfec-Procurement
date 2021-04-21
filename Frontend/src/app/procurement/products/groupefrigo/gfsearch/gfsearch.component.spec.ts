import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfsearchComponent } from './gfsearch.component';

describe('GfsearchComponent', () => {
  let component: GfsearchComponent;
  let fixture: ComponentFixture<GfsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
