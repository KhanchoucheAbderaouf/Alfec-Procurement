import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseuralldialogComponent } from './fournisseuralldialog.component';

describe('FournisseuralldialogComponent', () => {
  let component: FournisseuralldialogComponent;
  let fixture: ComponentFixture<FournisseuralldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseuralldialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseuralldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
