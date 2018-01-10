import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRuleSetHistoryComponent } from './asset-rule-set-history.component';
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent} from '../../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {MockRulesetService} from '../../../testing/mock-ruleset.service';

describe('AssetRuleSetHistoryComponent', () => {
  let component: AssetRuleSetHistoryComponent;
  let fixture: ComponentFixture<AssetRuleSetHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRuleSetHistoryComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [RouterTestingModule],

        providers: [
            {
              provide: ActivatedRoute, useClass: ActivatedRouteStub
            },
            {
              provide: RuleSetService, useClass: MockRulesetService
            }
        ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRuleSetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
