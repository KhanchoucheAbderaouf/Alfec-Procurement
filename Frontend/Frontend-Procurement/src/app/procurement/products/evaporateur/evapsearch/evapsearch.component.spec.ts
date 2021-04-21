import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapsearchComponent } from './evapsearch.component';

describe('EvapsearchComponent', () => {
  let component: EvapsearchComponent;
  let fixture: ComponentFixture<EvapsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
