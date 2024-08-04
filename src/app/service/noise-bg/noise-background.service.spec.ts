import { TestBed } from '@angular/core/testing';

import { NoiseBackgroundService } from './noise-background.service';

describe('NoiseBackgroundService', () => {
  let service: NoiseBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoiseBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
