import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasVehiculosListComponent } from './tarifas-vehiculos-list.component';

describe('TarifasVehiculosListComponent', () => {
  let component: TarifasVehiculosListComponent;
  let fixture: ComponentFixture<TarifasVehiculosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasVehiculosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasVehiculosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
