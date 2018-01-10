import { TestBed, inject } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GobalErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandlerService]
    });
  });

  it('should be created', inject([GlobalErrorHandlerService], (service: GlobalErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
