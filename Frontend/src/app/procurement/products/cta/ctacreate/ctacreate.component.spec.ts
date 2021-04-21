import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacreateComponent } from './ctacreate.component';

describe('CtacreateComponent', () => {
  let component: CtacreateComponent;
  let fixture: ComponentFixture<CtacreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtacreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
