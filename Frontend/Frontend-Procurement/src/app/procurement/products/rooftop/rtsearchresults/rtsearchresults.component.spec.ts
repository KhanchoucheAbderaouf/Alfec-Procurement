import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtsearchresultsComponent } from './rtsearchresults.component';

describe('RtsearchresultsComponent', () => {
  let component: RtsearchresultsComponent;
  let fixture: ComponentFixture<RtsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
