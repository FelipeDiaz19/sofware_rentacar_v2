import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEmpresasReemplazoFormUpdateComponent } from './tarifas-empresas-reemplazo-form-update.component';

describe('TarifasEmpresasReemplazoFormUpdateComponent', () => {
  let component: TarifasEmpresasReemplazoFormUpdateComponent;
  let fixture: ComponentFixture<TarifasEmpresasReemplazoFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasEmpresasReemplazoFormUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasEmpresasReemplazoFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
