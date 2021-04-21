import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfcreateComponent } from './gfcreate.component';

describe('GfcreateComponent', () => {
  let component: GfcreateComponent;
  let fixture: ComponentFixture<GfcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
