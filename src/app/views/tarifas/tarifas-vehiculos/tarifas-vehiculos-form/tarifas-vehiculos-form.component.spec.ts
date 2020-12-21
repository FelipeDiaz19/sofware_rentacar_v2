import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasVehiculosFormComponent } from './tarifas-vehiculos-form.component';

describe('TarifasVehiculosFormComponent', () => {
  let component: TarifasVehiculosFormComponent;
  let fixture: ComponentFixture<TarifasVehiculosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasVehiculosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasVehiculosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
