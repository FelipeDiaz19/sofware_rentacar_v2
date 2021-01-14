import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoTipoComponent } from './arriendo-tipo.component';

describe('ArriendoTipoComponent', () => {
  let component: ArriendoTipoComponent;
  let fixture: ComponentFixture<ArriendoTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
