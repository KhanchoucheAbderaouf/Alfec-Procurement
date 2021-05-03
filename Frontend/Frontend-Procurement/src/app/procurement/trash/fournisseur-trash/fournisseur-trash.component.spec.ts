import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurTrashComponent } from './fournisseur-trash.component';

describe('FournisseurTrashComponent', () => {
  let component: FournisseurTrashComponent;
  let fixture: ComponentFixture<FournisseurTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
