import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityRuleSetHistoryComponent } from './facility-rule-set-history.component';
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent} from '../../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {MockRulesetService} from '../../../testing/mock-ruleset.service';
import {ActivatedRoute} from '@angular/router';

describe('FacilityRuleSetHistoryComponent', () => {
  let component: FacilityRuleSetHistoryComponent;
  let fixture: ComponentFixture<FacilityRuleSetHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityRuleSetHistoryComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [RouterTestingModule],
        providers: [
            {
              provide: RuleSetService, useClass: MockRulesetService
            },
            {
              provide: ActivatedRoute, useClass: ActivatedRouteStub
            }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityRuleSetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
