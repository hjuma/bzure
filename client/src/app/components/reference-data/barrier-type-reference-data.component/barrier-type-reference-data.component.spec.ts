import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrierTypeReferenceDataComponent } from './barrier-type-reference-data.component';
import {TableSort} from '../../../core/filter/customFilter';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetService} from '../../../core/services/asset.service';
import {MockAssetService} from '../../../testing/mock-asset.service';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ToasterService} from 'angular2-toaster';

describe('BarrierTypeReferenceDataComponent', () => {
  let component: BarrierTypeReferenceDataComponent;
  let fixture: ComponentFixture<BarrierTypeReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrierTypeReferenceDataComponent, TableSort, OrderBy ],
        imports: [ReactiveFormsModule, FormsModule],
        providers: [
            {
                provide: AssetService, useClass: MockAssetService
            },
            {
                provide: ReferenceDataService, useClass: MockReferenceDataService
            },
            ToasterService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrierTypeReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
