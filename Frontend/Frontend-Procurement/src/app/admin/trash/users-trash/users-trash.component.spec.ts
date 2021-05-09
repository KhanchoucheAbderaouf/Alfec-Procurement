import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTrashComponent } from './users-trash.component';

describe('UsersTrashComponent', () => {
  let component: UsersTrashComponent;
  let fixture: ComponentFixture<UsersTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
