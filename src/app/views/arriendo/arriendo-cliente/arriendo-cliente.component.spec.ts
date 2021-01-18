import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoClienteComponent } from './arriendo-cliente.component';

describe('ArriendoClienteComponent', () => {
  let component: ArriendoClienteComponent;
  let fixture: ComponentFixture<ArriendoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
