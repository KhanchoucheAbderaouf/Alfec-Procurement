import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GegindexComponent } from './gegindex.component';

describe('GegindexComponent', () => {
  let component: GegindexComponent;
  let fixture: ComponentFixture<GegindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GegindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GegindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
