import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtsearchComponent } from './rtsearch.component';

describe('RtsearchComponent', () => {
  let component: RtsearchComponent;
  let fixture: ComponentFixture<RtsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
