import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalHeaderComponent } from './sucursal-header.component';

describe('SucursalHeaderComponent', () => {
  let component: SucursalHeaderComponent;
  let fixture: ComponentFixture<SucursalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
