import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompeindexComponent } from './pompeindex.component';

describe('PompeindexComponent', () => {
  let component: PompeindexComponent;
  let fixture: ComponentFixture<PompeindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PompeindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PompeindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
