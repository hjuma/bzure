import { TestBed, inject } from '@angular/core/testing';

import { RuleSetService } from './rule-set.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RuleSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleSetService],
        imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([RuleSetService], (service: RuleSetService) => {
    expect(service).toBeTruthy();
  }));
});
