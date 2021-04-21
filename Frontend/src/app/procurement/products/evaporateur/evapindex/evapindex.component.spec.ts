import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapindexComponent } from './evapindex.component';

describe('EvapindexComponent', () => {
  let component: EvapindexComponent;
  let fixture: ComponentFixture<EvapindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
