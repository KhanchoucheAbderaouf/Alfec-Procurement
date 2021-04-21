import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfsearchresultsComponent } from './gfsearchresults.component';

describe('GfsearchresultsComponent', () => {
  let component: GfsearchresultsComponent;
  let fixture: ComponentFixture<GfsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
