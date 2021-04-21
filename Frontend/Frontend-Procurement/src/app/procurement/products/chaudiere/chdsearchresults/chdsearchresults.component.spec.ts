import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChdsearchresultsComponent } from './chdsearchresults.component';

describe('ChdsearchresultsComponent', () => {
  let component: ChdsearchresultsComponent;
  let fixture: ComponentFixture<ChdsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChdsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChdsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
