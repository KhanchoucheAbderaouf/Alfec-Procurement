import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChdsearchComponent } from './chdsearch.component';

describe('ChdsearchComponent', () => {
  let component: ChdsearchComponent;
  let fixture: ComponentFixture<ChdsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChdsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChdsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
