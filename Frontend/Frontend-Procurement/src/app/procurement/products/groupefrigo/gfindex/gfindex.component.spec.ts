import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfindexComponent } from './gfindex.component';

describe('GfindexComponent', () => {
  let component: GfindexComponent;
  let fixture: ComponentFixture<GfindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
