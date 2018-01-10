import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrierReferenceDataComponent } from './barrier-reference-data.component';
import {TableSort} from '../../../core/filter/customFilter';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ToasterService} from 'angular2-toaster';

describe('BarrierReferenceDataComponent', () => {
  let component: BarrierReferenceDataComponent;
  let fixture: ComponentFixture<BarrierReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrierReferenceDataComponent, TableSort, OrderBy ],
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
    fixture = TestBed.createComponent(BarrierReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
