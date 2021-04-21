import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcindexComponent } from './vcindex.component';

describe('VcindexComponent', () => {
  let component: VcindexComponent;
  let fixture: ComponentFixture<VcindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
