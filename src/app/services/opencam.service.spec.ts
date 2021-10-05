import { TestBed } from '@angular/core/testing';

import { OpencamService } from './opencam.service';

describe('OpencamService', () => {
  let service: OpencamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpencamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
