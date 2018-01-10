import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitReferenceDataComponent } from './business-unit-reference-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {TableSort} from '../../../core/filter/customFilter';

describe('BusinessUnitReferenceDataComponent', () => {
  let component: BusinessUnitReferenceDataComponent;
  let fixture: ComponentFixture<BusinessUnitReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitReferenceDataComponent, RouterLinkStubDirective, RouterOutletStubComponent, OrderBy, TableSort ],
        imports: [ReactiveFormsModule, RouterTestingModule, FormsModule],
        providers: [
            {
              provide: ReferenceDataService, useClass: MockReferenceDataService
            },
            ToasterService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
