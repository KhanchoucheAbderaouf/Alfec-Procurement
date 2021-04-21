import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompesearchresultsComponent } from './pompesearchresults.component';

describe('PompesearchresultsComponent', () => {
  let component: PompesearchresultsComponent;
  let fixture: ComponentFixture<PompesearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PompesearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PompesearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
