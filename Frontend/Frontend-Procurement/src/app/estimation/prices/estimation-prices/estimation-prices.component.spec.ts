import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationPricesComponent } from './estimation-prices.component';

describe('EstimationPricesComponent', () => {
  let component: EstimationPricesComponent;
  let fixture: ComponentFixture<EstimationPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
