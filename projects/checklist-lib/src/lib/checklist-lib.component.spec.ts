import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistLibComponent } from './checklist-lib.component';

describe('ChecklistLibComponent', () => {
  let component: ChecklistLibComponent;
  let fixture: ComponentFixture<ChecklistLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
