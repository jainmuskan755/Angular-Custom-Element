import { TestBed } from '@angular/core/testing';

import { ChecklistLibService } from './checklist-lib.service';

describe('ChecklistLibService', () => {
  let service: ChecklistLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
