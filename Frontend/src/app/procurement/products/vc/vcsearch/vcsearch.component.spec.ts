import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcsearchComponent } from './vcsearch.component';

describe('VcsearchComponent', () => {
  let component: VcsearchComponent;
  let fixture: ComponentFixture<VcsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
