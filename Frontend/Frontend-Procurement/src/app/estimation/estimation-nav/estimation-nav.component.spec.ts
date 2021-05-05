import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationNavComponent } from './estimation-nav.component';

describe('EstimationNavComponent', () => {
  let component: EstimationNavComponent;
  let fixture: ComponentFixture<EstimationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
