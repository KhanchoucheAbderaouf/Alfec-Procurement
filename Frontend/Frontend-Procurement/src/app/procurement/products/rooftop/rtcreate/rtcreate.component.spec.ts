import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcreateComponent } from './rtcreate.component';

describe('RtcreateComponent', () => {
  let component: RtcreateComponent;
  let fixture: ComponentFixture<RtcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
