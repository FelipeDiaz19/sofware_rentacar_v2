import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasAccesoriosFormComponent } from './tarifas-accesorios-form.component';

describe('TarifasAccesoriosFormComponent', () => {
  let component: TarifasAccesoriosFormComponent;
  let fixture: ComponentFixture<TarifasAccesoriosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasAccesoriosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasAccesoriosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
