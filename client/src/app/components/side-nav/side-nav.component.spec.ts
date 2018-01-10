import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import {RouterOutletStubComponent} from '../../testing/router-stubs';
import {RouterLinkStubDirective} from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationService} from '../../testing/mock-authentication.service';
import {AuthenticationService} from '../../core/services/authentication.service';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent,
          RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [ RouterTestingModule ],
        providers:[
            {
              provide: AuthenticationService, useClass: MockAuthenticationService
            }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
