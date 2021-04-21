import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurdetailsdialogComponent } from './fournisseurdetailsdialog.component';

describe('FournisseurdetailsdialogComponent', () => {
  let component: FournisseurdetailsdialogComponent;
  let fixture: ComponentFixture<FournisseurdetailsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurdetailsdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurdetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
