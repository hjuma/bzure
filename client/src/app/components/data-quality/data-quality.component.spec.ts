import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualityComponent } from './data-quality.component';
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FacilityService} from '../../core/services/facility.service';
import {MockFacilityService} from '../../testing/mock-facility.service';
import {MetadataService} from '../../core/services/metadata.service';
import {MockMetadataService} from '../../testing/mock-metadata.service';
import {AssetService} from '../../core/services/asset.service';
import {MockAssetService} from '../../testing/mock-asset.service';
import {ActivatedRoute} from '@angular/router';

describe('DataQualityComponent', () => {
  let component: DataQualityComponent;
  let fixture: ComponentFixture<DataQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataQualityComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [
            FormsModule,
            RouterTestingModule
        ],
        providers: [
            {
              provide: FacilityService, useClass: MockFacilityService
            },
            {
              provide: MetadataService, useClass: MockMetadataService
            },
            {
              provide: AssetService, useClass: MockAssetService
            },
            {
              provide: ActivatedRoute, useClass: ActivatedRouteStub
            }
        ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(DataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
