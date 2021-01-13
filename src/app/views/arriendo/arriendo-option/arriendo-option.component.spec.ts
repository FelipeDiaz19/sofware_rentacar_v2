import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoOptionComponent } from './arriendo-option.component';

describe('ArriendoOptionComponent', () => {
  let component: ArriendoOptionComponent;
  let fixture: ComponentFixture<ArriendoOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
