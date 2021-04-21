import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompecreateComponent } from './pompecreate.component';

describe('PompecreateComponent', () => {
  let component: PompecreateComponent;
  let fixture: ComponentFixture<PompecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PompecreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PompecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
