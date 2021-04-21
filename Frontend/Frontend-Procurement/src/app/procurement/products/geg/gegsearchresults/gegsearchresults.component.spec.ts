import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GegsearchresultsComponent } from './gegsearchresults.component';

describe('GegsearchresultsComponent', () => {
  let component: GegsearchresultsComponent;
  let fixture: ComponentFixture<GegsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GegsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GegsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
