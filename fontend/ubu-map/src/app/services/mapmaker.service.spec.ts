import { TestBed } from '@angular/core/testing';

import { MapmakerService } from './mapmaker.service';

describe('MapmakerService', () => {
  let service: MapmakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapmakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
