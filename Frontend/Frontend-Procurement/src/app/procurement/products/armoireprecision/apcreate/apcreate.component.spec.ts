import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApcreateComponent } from './apcreate.component';

describe('ApcreateComponent', () => {
  let component: ApcreateComponent;
  let fixture: ComponentFixture<ApcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
