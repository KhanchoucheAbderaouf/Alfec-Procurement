import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtauxchangeComponent } from './dialogtauxchange.component';

describe('DialogtauxchangeComponent', () => {
  let component: DialogtauxchangeComponent;
  let fixture: ComponentFixture<DialogtauxchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogtauxchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogtauxchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
