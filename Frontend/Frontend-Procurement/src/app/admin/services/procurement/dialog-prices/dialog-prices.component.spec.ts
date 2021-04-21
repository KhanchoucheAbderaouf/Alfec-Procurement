import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPricesComponent } from './dialog-prices.component';

describe('DialogPricesComponent', () => {
  let component: DialogPricesComponent;
  let fixture: ComponentFixture<DialogPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
