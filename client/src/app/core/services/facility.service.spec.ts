import { TestBed, inject } from '@angular/core/testing';

import { FacilityService } from './facility.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FacilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilityService],
        imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([FacilityService], (service: FacilityService) => {
    expect(service).toBeTruthy();
  }));
});
