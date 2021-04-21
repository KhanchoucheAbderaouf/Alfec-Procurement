import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChdindexComponent } from './chdindex.component';

describe('ChdindexComponent', () => {
  let component: ChdindexComponent;
  let fixture: ComponentFixture<ChdindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChdindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChdindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
