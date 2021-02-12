import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosContentComponent } from './permisos-content.component';

describe('PermisosContentComponent', () => {
  let component: PermisosContentComponent;
  let fixture: ComponentFixture<PermisosContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
