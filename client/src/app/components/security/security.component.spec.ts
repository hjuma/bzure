import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponent } from './security.component';
import {RouterLinkStubDirective, RouterOutletStubComponent, RouterStub} from '../../testing/router-stubs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {MockUserService} from '../../testing/mock-user.service';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [ReactiveFormsModule, FormsModule],
        providers: [
            ToasterService,
            {
              provide: UserService, useClass: MockUserService
            },
            {
              provide: Router, useClass: RouterStub
            }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
