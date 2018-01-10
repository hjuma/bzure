import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AssetService } from '../../../core/services/asset.service';
import { TableSort } from '../../../core/filter/customFilter';
import { OrderBy } from '../../../core/filter/orderByPipe';
import { Asset } from '../../../core/models/asset';
import { BusinessUnit } from '../../../core/models/business-unit';
import { UserService } from '../../../core/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { assetHeaders } from '../../../core/constants/reference-data-headers';
import { ReferenceDataComponent } from '../../reference-data/reference-data.component';
import { barrierTypeHeaders } from '../../../core/constants/reference-data-headers';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { error } from 'util';

@Component({
  selector: 'app-asset-reference-data',
  templateUrl: './asset-reference-data.component.html',
  styleUrls: ['./asset-reference-data.component.scss']
})
export class AssetReferenceDataComponent extends ReferenceDataComponent implements OnInit {

  private assets: Array<Asset>;
  private assetForm: FormGroup;
  private asset: Object;
  private businessUnits: Array<BusinessUnit>;

  constructor(private referenceDataService: ReferenceDataService, private assetService: AssetService,
    private formBuilder: FormBuilder, private toasterService: ToasterService, private paginationService: PaginationService) {
    super();
    this.asset = {};
    this.headers = assetHeaders;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeForm();
    this.initializeAssets();
    this.pagination['currentPage'] = 1;
  }

  private initializeAssets() {
    this.referenceDataService.getAllBusinessUnits().subscribe(businessUnits => {
      this.businessUnits = businessUnits;
      this.referenceDataService.getAllAssets().subscribe(response => {
        this.rows = new Array<object>();
        this.assets = response;
        this.assets.forEach(asset => {
          const row = {};
          row['isEdit'] = false;
          row['values'] = asset;
          this.rows.push(row);
        });
      }, error => { }, () => {
        this.setPage(this.pagination['currentPage']);
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
    this.asset = row['values'];
  }

  private generatePayload(current: Object) {
    const asset: any = {};
    asset['business_unit_id'] = current['business_unit_id'];
    asset['code'] = current['code'];
    asset['name'] = current['name'];
    if (!this.isNew) {
      asset['id'] = current['id'];
      asset['version_no'] = current['version_no'];
    }
    return asset;
  }

  cancel(row: Object) {
    if (this.isNew) {
      this.rows.splice(0, 1);
    }
    if (!this.isNew) {
      row['isEdit'] = false;
    }
    this.asset = {};
    this.resetFormErrors(this.assetForm);
  }

  private initializeForm() {
    this.assetForm = this.formBuilder.group({
      code: ['', Validators.required],
      businessunit: ['', Validators.required],
      name: ['', Validators.required],
      columnFilter: ['']
    });
  }

  getBusinessUnitNameById(id: number) {
    var obj = this.businessUnits.filter(function (businessUnit) {
      return businessUnit.id == id;
    })[0];
    return obj.name;
  }

  save(row: Object) {
    this.submitted = true;
    if (this.assetForm.valid) {
      const payload = this.generatePayload(this.asset);
      if (this.isNew) {
        this.referenceDataService.addAsset(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeAssets();
        });
      } else {
        this.referenceDataService.saveAsset(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeAssets();
        });
      }
    } else {
      this.toasterService.pop('error', this.getFormValidationErrors(this.assetForm));
    }
  }

  add() {
    this.isNew = true;
    const row = {};
    this.asset = {};
    row['isEdit'] = true;
    row['values'] = this.asset;
    this.rows.splice(0, 0, row);
    this.setPage(1);
  }

  changeBusinessUnit(even: Event, id: any) {
    const selectedIndex = event.target['selectedIndex'];
    this.asset['BusinessUnit'] = this.businessUnits.filter(business =>
      business.id === selectedIndex
    )[0];
  }

}
