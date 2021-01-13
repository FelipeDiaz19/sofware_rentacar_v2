import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoFormComponent } from './arriendo-form.component';

describe('ArriendoFormComponent', () => {
  let component: ArriendoFormComponent;
  let fixture: ComponentFixture<ArriendoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
