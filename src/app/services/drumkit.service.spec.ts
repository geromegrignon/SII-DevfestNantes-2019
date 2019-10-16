import { TestBed } from '@angular/core/testing';

import { DrumkitService } from './drumkit.service';

describe('DrumkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrumkitService = TestBed.get(DrumkitService);
    expect(service).toBeTruthy();
  });
});
