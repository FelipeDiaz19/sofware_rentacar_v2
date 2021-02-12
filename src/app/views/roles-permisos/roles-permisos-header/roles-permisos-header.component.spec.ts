import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermisosHeaderComponent } from './roles-permisos-header.component';

describe('RolesPermisosHeaderComponent', () => {
  let component: RolesPermisosHeaderComponent;
  let fixture: ComponentFixture<RolesPermisosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPermisosHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPermisosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
