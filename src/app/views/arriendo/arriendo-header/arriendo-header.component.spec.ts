import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoHeaderComponent } from './arriendo-header.component';

describe('ArriendoHeaderComponent', () => {
  let component: ArriendoHeaderComponent;
  let fixture: ComponentFixture<ArriendoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
