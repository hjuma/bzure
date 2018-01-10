import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReferenceDataComponent } from './facility-reference-data.component';
import {TableSort} from '../../../core/filter/customFilter';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetService} from '../../../core/services/asset.service';
import {MockAssetService} from '../../../testing/mock-asset.service';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ToasterService} from 'angular2-toaster';
import {FacilityService} from '../../../core/services/facility.service';
import {MockFacilityService} from '../../../testing/mock-facility.service';

describe('FacilityReferenceDataComponent', () => {
  let component: FacilityReferenceDataComponent;
  let fixture: ComponentFixture<FacilityReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityReferenceDataComponent , TableSort, OrderBy ],
        imports: [ReactiveFormsModule, FormsModule],
        providers: [
            {
                provide: AssetService, useClass: MockAssetService
            },
            {
                provide: FacilityService, useClass: MockFacilityService
            },
            ToasterService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
