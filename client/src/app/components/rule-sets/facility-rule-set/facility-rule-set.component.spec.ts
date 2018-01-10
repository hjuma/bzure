import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityRuleSetComponent } from './facility-rule-set.component';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../../testing/router-stubs';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {FacilityService} from '../../../core/services/facility.service';
import {MockFacilityService} from '../../../testing/mock-facility.service';
import {MockAuthenticationService} from '../../../testing/mock-authentication.service';
import {MetadataService} from '../../../core/services/metadata.service';
import {MockMetadataService} from '../../../testing/mock-metadata.service';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {MockRulesetService} from '../../../testing/mock-ruleset.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {ToasterService} from 'angular2-toaster';
import {AssetService} from '../../../core/services/asset.service';
import {MockAssetService} from '../../../testing/mock-asset.service';


describe('FacilityRuleSetComponent', () => {
  let component: FacilityRuleSetComponent;
  let fixture: ComponentFixture<FacilityRuleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityRuleSetComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [FormsModule, RouterTestingModule],
        providers: [
            {
                provide: FacilityService, useClass: MockFacilityService
            },
            {
                provide: AssetService, useClass: MockAssetService
            },
            {
                provide: AuthenticationService, useClass: MockAuthenticationService
            },
            {
                provide: MetadataService, useClass: MockMetadataService
            },
            {
                provide: RuleSetService, useClass: MockRulesetService
            },
            ToasterService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityRuleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
