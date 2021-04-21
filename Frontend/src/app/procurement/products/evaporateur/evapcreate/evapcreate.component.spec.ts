import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapcreateComponent } from './evapcreate.component';

describe('EvapcreateComponent', () => {
  let component: EvapcreateComponent;
  let fixture: ComponentFixture<EvapcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
