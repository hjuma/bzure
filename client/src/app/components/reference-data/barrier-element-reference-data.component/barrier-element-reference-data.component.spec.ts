import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrierElementReferenceDataComponent } from './barrier-element-reference-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableSort} from '../../../core/filter/customFilter';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ToasterService} from 'angular2-toaster';

describe('BarrierElementReferenceDataComponent', () => {
  let component: BarrierElementReferenceDataComponent;
  let fixture: ComponentFixture<BarrierElementReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrierElementReferenceDataComponent, TableSort, OrderBy ],
        imports: [ReactiveFormsModule, FormsModule],
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
    fixture = TestBed.createComponent(BarrierElementReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
