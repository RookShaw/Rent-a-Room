import { TestBed } from '@angular/core/testing';

import { HookupService } from './hookup.service';

describe('HookupService', () => {
  let service: HookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
