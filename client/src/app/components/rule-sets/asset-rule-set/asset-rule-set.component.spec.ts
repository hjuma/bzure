import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRuleSetComponent } from './asset-rule-set.component';
import {FormsModule} from '@angular/forms';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAssetService} from '../../../testing/mock-asset.service';
import {AssetService} from '../../../core/services/asset.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {MockAuthenticationService} from '../../../testing/mock-authentication.service';
import {MetadataService} from '../../../core/services/metadata.service';
import {MockMetadataService} from '../../../testing/mock-metadata.service';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {MockRulesetService} from '../../../testing/mock-ruleset.service';
import {ToasterService} from 'angular2-toaster';

describe('AssetRuleSetComponent', () => {
    let component: AssetRuleSetComponent;
    let fixture: ComponentFixture<AssetRuleSetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssetRuleSetComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
            imports: [FormsModule, RouterTestingModule],
            providers: [
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
        fixture = TestBed.createComponent(AssetRuleSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
