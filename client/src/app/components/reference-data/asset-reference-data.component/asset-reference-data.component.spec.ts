import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReferenceDataComponent } from './asset-reference-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableSort} from '../../../core/filter/customFilter';
import {OrderBy} from '../../../core/filter/orderByPipe';
import {AssetService} from '../../../core/services/asset.service';
import {MockAssetService} from '../../../testing/mock-asset.service';
import {ReferenceDataService} from '../../../core/services/reference-data.service';
import {MockReferenceDataService} from '../../../testing/mock-reference-data.service';
import {ToasterService} from 'angular2-toaster';

describe('AssetReferenceDataComponent', () => {
  let component: AssetReferenceDataComponent;
  let fixture: ComponentFixture<AssetReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetReferenceDataComponent, TableSort, OrderBy ],
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
    fixture = TestBed.createComponent(AssetReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
