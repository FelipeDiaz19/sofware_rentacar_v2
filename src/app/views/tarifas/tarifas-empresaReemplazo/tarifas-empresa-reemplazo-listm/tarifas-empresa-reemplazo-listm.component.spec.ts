import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEmpresaReemplazoListmComponent } from './tarifas-empresa-reemplazo-listm.component';

describe('TarifasEmpresaReemplazoListmComponent', () => {
  let component: TarifasEmpresaReemplazoListmComponent;
  let fixture: ComponentFixture<TarifasEmpresaReemplazoListmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasEmpresaReemplazoListmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasEmpresaReemplazoListmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
