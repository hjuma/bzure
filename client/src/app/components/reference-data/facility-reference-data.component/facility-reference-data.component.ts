import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AssetService } from '../../../core/services/asset.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { FacilityService } from '../../../core/services/facility.service';
import { TableSort } from '../../../core/filter/customFilter';
import { OrderBy } from '../../../core/filter/orderByPipe';
import { Asset } from '../../../core/models/asset';
import { Facility } from '../../../core/models/facility';
import { BusinessUnit } from '../../../core/models/business-unit';
import { UserService } from '../../../core/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { Categories } from '../../../core/constants/categories';
import { facilityHeaders } from '../../../core/constants/reference-data-headers';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { ReferenceDataComponent } from '../../reference-data/reference-data.component';

@Component({
  selector: 'app-facility-reference-data',
  templateUrl: './facility-reference-data.component.html',
  styleUrls: ['./facility-reference-data.component.scss']
})
export class FacilityReferenceDataComponent extends ReferenceDataComponent implements OnInit {

  private assets: Array<Asset>;
  private facilities: Array<Facility>;
  private facilityForm: FormGroup;
  private facility: Object;
  private categories: Array<string>;

  constructor(private referenceDataService: ReferenceDataService, private formBuilder: FormBuilder, private toasterService: ToasterService, private paginationService: PaginationService) {
    super();
    this.facility = {};
    this.categories = Categories;
    this.headers = facilityHeaders;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeForm();
    this.initializeEntities();
    this.pagination['currentPage'] = 1;
  }

  private initializeEntities() {
    this.referenceDataService.getAllAssets().subscribe(assets => {
      this.assets = assets;
      this.referenceDataService.getAllFacilties().subscribe(facilities => {
        this.rows = new Array<object>();
        this.facilities = facilities;
        this.facilities.forEach(facility => {
          const row = {};
          row['isEdit'] = false;
          row['values'] = facility;
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
    this.facility = row['values'];
  }

  private generatePayload(current: Object) {
    const facility: any = {};
    facility['asset_id'] = current['asset_id'];
    facility['code'] = current['code'];
    facility['name'] = current['name'];
    facility['category'] = current['category'];
    if (!this.isNew) {
      facility['id'] = current['id'];
    }
    return facility;
  }

  cancel(row: Object) {
    this.resetFormErrors(this.facilityForm);
    if (this.isNew) {
      this.rows.splice(0, 1);
    }
    if (!this.isNew) {
      row['isEdit'] = false;
    }
    this.facility = {};
  }

  private initializeForm() {
    this.facilityForm = this.formBuilder.group({
      code: ['', Validators.required],
      asset: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      columnFilter: ['']
    });
  }

  save(row: Object) {
    this.submitted = true;
    if (this.facilityForm.valid) {
      const payload = this.generatePayload(this.facility);
      if (this.isNew) {
        this.referenceDataService.addFacility(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeEntities();
        });
      } else {
        this.referenceDataService.saveFacility(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeEntities();
        });
      }
    } else {
      this.toasterService.pop('error', this.getFormValidationErrors(this.facilityForm));
    }
  }

  add() {
    this.isNew = true;
    const row = {};
    this.facility = {};
    row['isEdit'] = true;
    row['values'] = this.facility;
    this.rows.splice(0, 0, row);
    this.setPage(1);
  }

  changeAsset(even: Event, id: any) {
    const selectedIndex = event.target['selectedIndex'];
    this.facility['Asset'] = this.assets.filter(asset =>
      asset.id === selectedIndex
    )[0];
  }

}
