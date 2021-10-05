import { TestBed } from '@angular/core/testing';

import { RunimagesService } from './runimages.service';

describe('RunimagesService', () => {
  let service: RunimagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunimagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
