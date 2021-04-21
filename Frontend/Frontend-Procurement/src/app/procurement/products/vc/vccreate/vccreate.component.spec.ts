import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VccreateComponent } from './vccreate.component';

describe('VccreateComponent', () => {
  let component: VccreateComponent;
  let fixture: ComponentFixture<VccreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VccreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VccreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
