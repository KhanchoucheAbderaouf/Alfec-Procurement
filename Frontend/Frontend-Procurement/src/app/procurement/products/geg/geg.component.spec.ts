import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GegComponent } from './geg.component';

describe('GegComponent', () => {
  let component: GegComponent;
  let fixture: ComponentFixture<GegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
