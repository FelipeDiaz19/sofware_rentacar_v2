import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEmpresaReemplazoFormComponent } from './tarifas-empresa-reemplazo-form.component';

describe('TarifasEmpresaReemplazoFormComponent', () => {
  let component: TarifasEmpresaReemplazoFormComponent;
  let fixture: ComponentFixture<TarifasEmpresaReemplazoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasEmpresaReemplazoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasEmpresaReemplazoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
