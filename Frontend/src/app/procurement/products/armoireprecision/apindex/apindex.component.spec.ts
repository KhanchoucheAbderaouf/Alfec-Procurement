import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApindexComponent } from './apindex.component';

describe('ApindexComponent', () => {
  let component: ApindexComponent;
  let fixture: ComponentFixture<ApindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
