import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapsearchresultsComponent } from './evapsearchresults.component';

describe('EvapsearchresultsComponent', () => {
  let component: EvapsearchresultsComponent;
  let fixture: ComponentFixture<EvapsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
