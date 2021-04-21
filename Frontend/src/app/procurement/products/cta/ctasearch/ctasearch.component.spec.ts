import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtasearchComponent } from './ctasearch.component';

describe('CtasearchComponent', () => {
  let component: CtasearchComponent;
  let fixture: ComponentFixture<CtasearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtasearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtasearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
