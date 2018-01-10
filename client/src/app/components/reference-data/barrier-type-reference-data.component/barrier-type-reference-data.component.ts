import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TableSort } from '../../../core/filter/customFilter';
import { AssetService } from '../../../core/services/asset.service';
import { OrderBy } from '../../../core/filter/orderByPipe';
import { BarrierType } from '../../../core/models/barrier-type';
import { BarrierElement } from '../../../core/models/barrier-element';
import { Asset } from '../../../core/models/asset';
import { Barrier } from '../../../core/models/barrier';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { ToasterService } from 'angular2-toaster';
import { ReferenceDataComponent } from '../../reference-data/reference-data.component';
import { barrierTypeHeaders } from '../../../core/constants/reference-data-headers';
import { PaginationService } from '../../../core/services/pagination.service';

@Component({
  selector: 'app-barrier-type-reference-data',
  templateUrl: './barrier-type-reference-data.component.html',
  styleUrls: ['./barrier-type-reference-data.component.scss']
})
export class BarrierTypeReferenceDataComponent extends ReferenceDataComponent implements OnInit {

  private barrierTypeForm: FormGroup;
  private barrierTypes: Array<BarrierType>;
  private barrierType: Object;
  private barriers: Array<Barrier>;
  private assets: Array<Asset>;

  constructor(private referenceDataService: ReferenceDataService, private assetService: AssetService, private formBuilder: FormBuilder, private toasterService: ToasterService, private paginationService: PaginationService) {
    super();
    this.barrierType = {};
    this.headers = barrierTypeHeaders;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeForm();
    this.initializeBarrierTypes();
    this.pagination['currentPage'] = 1;
  }

  private initializeBarrierTypes() {
    this.referenceDataService.getAllAssets().subscribe(assets => {
      this.assets = assets;
      this.referenceDataService.getBarriers().subscribe(barriers => {
        this.barriers = barriers;
        this.referenceDataService.getAllBarrierTypes().subscribe(barrierTypes => {
          this.rows = new Array<object>();
          this.barrierTypes = barrierTypes;
          this.barrierTypes.forEach(barrierType => {
            const row = {};
            row['isEdit'] = false;
            row['values'] = barrierType;
            this.rows.push(row);
          });
        }, error => { }, () => {
          this.setPage(this.pagination['currentPage']);
        });
      });
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination['totalPages'] || this.rows.length === 0) {
      return;
    }
    this.pagination = this.paginationService.getPaginationDetails(this.rows.length, page);
    this.pagedRows = this.rows.slice(this.pagination['startIndex'], this.pagination['endIndex'] + 1);
  }


  edit(row: Object) {
    this.isNew = false;
    row['isEdit'] = true;
    this.barrierType = row['values'];
  }

  private generatePayload(current: Object) {
    const barrierType: any = {};
    barrierType['name'] = current['name'];
    barrierType['description'] = current['description'];
    barrierType['asset_id'] = current['asset_id'];
    barrierType['barrier_id'] = current['barrier_id'];
    barrierType['display_order'] = current['display_order'];
    if (!this.isNew) {
      barrierType['id'] = current['id'];
    }
    return barrierType;
  }

  cancel(row: Object) {
    if (this.isNew) {
      this.rows.splice(0, 1);
    }
    if (!this.isNew) {
      row['isEdit'] = false;
    }
    this.barrierType = {};
    this.resetFormErrors(this.barrierTypeForm);
  }

  private initializeForm() {
    this.barrierTypeForm = this.formBuilder.group({
      asset: ['', Validators.required],
      barrier: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      columnFilter: ['']
    });
  }

  moveUp(index) {
    this.swapElements(index, index - 1);
  }

  moveDown(index) {
    this.swapElements(index, index + 1);
  }

  private swapElements(indexA, indexB) {
    // modify the display orders and persist them in the database , let the values be retrived as per the db order
    const temp = this.rows[indexA]['values']['display_order'];
    this.rows[indexA]['values']['display_order'] = this.rows[indexB]['values']['display_order'];
    this.rows[indexB]['values']['display_order'] = temp;
    // this.rows[indexA] = this.rows.splice(indexB, 1, this.rows[indexA])[0];
    const objA = this.generatePayload(this.rows[indexA]['values']);
    const objB = this.generatePayload(this.rows[indexB]['values']);
    this.saveBarrierType(objA);
    this.saveBarrierType(objB);
  }


  private saveBarrierType(payload: any) {
    this.referenceDataService.saveBarrierType(payload).subscribe((response) => {
      this.toasterService.pop('success', response.message);
      this.initializeBarrierTypes();
    });
  }

  save(row: Object) {
    this.submitted = true;
    if (this.barrierTypeForm.valid) {
      const payload = this.generatePayload(this.barrierType);
      if (this.isNew) {
        this.referenceDataService.addBarrierType(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeBarrierTypes();
        });
      } else {
        this.saveBarrierType(payload);
      }
    } else {
      this.toasterService.pop('error', this.getFormValidationErrors(this.barrierTypeForm));
    }
  }

  add() {
    this.isNew = true;
    this.barrierType = {};
    const row = {};
    row['isEdit'] = true;
    row['values'] = this.barrierType;
    this.rows.splice(0, 0, row);
    this.setPage(1);
  }

  changeAsset(even: Event, id: any) {
    const selectedIndex = event.target['selectedIndex'];
    this.barrierType['Asset'] = this.assets.filter(asset =>
      asset.id === selectedIndex
    )[0];
  }

  changeBarrier(event: Event, id: any) {
    const selectedIndex = event.target['selectedIndex'];
    this.barrierType['Barrier'] = this.barriers.filter(barrierType =>
      barrierType.id === selectedIndex
    )[0];
  }

}
