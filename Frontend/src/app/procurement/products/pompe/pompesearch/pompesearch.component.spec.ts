import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompesearchComponent } from './pompesearch.component';

describe('PompesearchComponent', () => {
  let component: PompesearchComponent;
  let fixture: ComponentFixture<PompesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PompesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PompesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
