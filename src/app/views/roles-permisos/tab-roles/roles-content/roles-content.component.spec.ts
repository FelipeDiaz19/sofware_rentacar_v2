import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesContentComponent } from './roles-content.component';

describe('RolesContentComponent', () => {
  let component: RolesContentComponent;
  let fixture: ComponentFixture<RolesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
