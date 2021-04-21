import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconfirmsuppuserComponent } from './dialogconfirmsuppuser.component';

describe('DialogconfirmsuppuserComponent', () => {
  let component: DialogconfirmsuppuserComponent;
  let fixture: ComponentFixture<DialogconfirmsuppuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconfirmsuppuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconfirmsuppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
