import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtindexComponent } from './rtindex.component';

describe('RtindexComponent', () => {
  let component: RtindexComponent;
  let fixture: ComponentFixture<RtindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
