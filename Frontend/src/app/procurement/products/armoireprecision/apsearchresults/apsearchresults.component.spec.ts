import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsearchresultsComponent } from './apsearchresults.component';

describe('ApsearchresultsComponent', () => {
  let component: ApsearchresultsComponent;
  let fixture: ComponentFixture<ApsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
