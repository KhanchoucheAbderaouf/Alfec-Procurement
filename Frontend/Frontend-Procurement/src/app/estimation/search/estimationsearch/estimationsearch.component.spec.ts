import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationsearchComponent } from './estimationsearch.component';

describe('EstimationsearchComponent', () => {
  let component: EstimationsearchComponent;
  let fixture: ComponentFixture<EstimationsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
