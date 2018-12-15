import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessPage } from './first-access.page';

describe('FirstAccessPage', () => {
  let component: FirstAccessPage;
  let fixture: ComponentFixture<FirstAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstAccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
