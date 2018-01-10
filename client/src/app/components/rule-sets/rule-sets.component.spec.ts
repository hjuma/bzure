import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSetsComponent } from './rule-sets.component';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';

describe('RuleSetsComponent', () => {
  let component: RuleSetsComponent;
  let fixture: ComponentFixture<RuleSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleSetsComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
