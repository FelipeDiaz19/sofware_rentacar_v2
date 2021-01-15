import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoContactoComponent } from './arriendo-contacto.component';

describe('ArriendoContactoComponent', () => {
  let component: ArriendoContactoComponent;
  let fixture: ComponentFixture<ArriendoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
