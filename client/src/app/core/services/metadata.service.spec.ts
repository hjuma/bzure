import { TestBed, inject } from '@angular/core/testing';

import { MetadataService } from './metadata.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MetadataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetadataService],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([MetadataService], (service: MetadataService) => {
        expect(service).toBeTruthy();
    }));
});
