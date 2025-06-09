import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTableComponent } from './component-table.component';

describe('ComponentTableComponent', () => {
  let component: ComponentTableComponent;
  let fixture: ComponentFixture<ComponentTableComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
