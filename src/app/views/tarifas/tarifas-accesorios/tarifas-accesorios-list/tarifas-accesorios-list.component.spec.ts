import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasAccesoriosListComponent } from './tarifas-accesorios-list.component';

describe('TarifasAccesoriosListComponent', () => {
  let component: TarifasAccesoriosListComponent;
  let fixture: ComponentFixture<TarifasAccesoriosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasAccesoriosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifasAccesoriosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
