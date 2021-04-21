import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpriceshistoryComponent } from './dialogpriceshistory.component';

describe('DialogpriceshistoryComponent', () => {
  let component: DialogpriceshistoryComponent;
  let fixture: ComponentFixture<DialogpriceshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpriceshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpriceshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
