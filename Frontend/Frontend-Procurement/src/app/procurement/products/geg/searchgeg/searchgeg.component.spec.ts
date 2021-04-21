import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgegComponent } from './searchgeg.component';

describe('SearchgegComponent', () => {
  let component: SearchgegComponent;
  let fixture: ComponentFixture<SearchgegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchgegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchgegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
