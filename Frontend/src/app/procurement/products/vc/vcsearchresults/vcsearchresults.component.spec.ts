import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcsearchresultsComponent } from './vcsearchresults.component';

describe('VcsearchresultsComponent', () => {
  let component: VcsearchresultsComponent;
  let fixture: ComponentFixture<VcsearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcsearchresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcsearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
