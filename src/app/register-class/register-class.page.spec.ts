import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClassPage } from './register-class.page';

describe('RegisterClassPage', () => {
  let component: RegisterClassPage;
  let fixture: ComponentFixture<RegisterClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
