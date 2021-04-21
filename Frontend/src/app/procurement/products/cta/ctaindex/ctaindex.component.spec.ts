import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaindexComponent } from './ctaindex.component';

describe('CtaindexComponent', () => {
  let component: CtaindexComponent;
  let fixture: ComponentFixture<CtaindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
