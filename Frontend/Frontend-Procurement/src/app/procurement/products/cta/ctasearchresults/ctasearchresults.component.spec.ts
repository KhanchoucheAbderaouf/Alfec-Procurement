import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtasearchresultsComponent } from './ctasearchresults.component';

describe('CtasearchresultsComponent', () => {
  let component: CtasearchresultsComponent;
  let fixture: ComponentFixture<CtasearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtasearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtasearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
