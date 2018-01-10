import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TableSort } from '../../../core/filter/customFilter';
import { OrderBy } from '../../../core/filter/orderByPipe';
import { BusinessUnit } from '../../../core/models/business-unit';
import { BarrierElement } from '../../../core/models/barrier-element';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { ToasterService } from 'angular2-toaster';
import { ReferenceDataComponent } from '../../reference-data/reference-data.component';
import { businessUnitHeaders } from '../../../core/constants/reference-data-headers';

@Component({
  selector: 'app-business-unit-reference-data',
  templateUrl: './business-unit-reference-data.component.html',
  styleUrls: ['./business-unit-reference-data.component.scss']
})
export class BusinessUnitReferenceDataComponent extends ReferenceDataComponent implements OnInit {

  private businessUnitForm: FormGroup;
  private businessUnits: Array<BusinessUnit>;
  private businessUnit: Object;

  constructor(private referenceDataService: ReferenceDataService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService, private paginationService: PaginationService) {
    super();
    this.businessUnit = {};
    this.headers = businessUnitHeaders;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeForm();
    this.initializeBusinessUnits();
    this.pagination['currentPage'] = 1;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination['totalPages']) {
      return;
    }
    this.pagination = this.paginationService.getPaginationDetails(this.rows.length, page);
    this.pagedRows = this.rows.slice(this.pagination['startIndex'], this.pagination['endIndex'] + 1);
  }

  private initializeBusinessUnits() {
    this.referenceDataService.getAllBusinessUnits().subscribe(response => {
      this.businessUnits = response;
      this.rows = new Array<object>();
      this.businessUnits.forEach(businessUnit => {
        const row = {};
        row['isEdit'] = false;
        row['values'] = businessUnit;
        this.rows.push(row);
        this.setPage(1);
      });
    }, error => { }, () => {
      this.setPage(this.pagination['currentPage']);
    });
  }

  edit(row: Object) {
    this.isNew = false;
    row['isEdit'] = true;
    this.businessUnit = row['values'];
  }

  private generatePayload(current: Object) {
    const businessUnit: any = {};
    businessUnit['name'] = current['name'];
    businessUnit['description'] = current['description'];
    if (!this.isNew) {
      businessUnit['id'] = current['id'];
    }
    return businessUnit;
  }

  cancel(row: Object) {
    if (this.isNew) {
      this.rows.splice(0, 1);
    }
    if (!this.isNew) {
      row['isEdit'] = false;
    }
    this.businessUnit = {};
    this.resetFormErrors(this.businessUnitForm);
  }

  private initializeForm() {
    this.businessUnitForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      columnFilter: ['']
    });
  }

  save(row: Object) {
    this.submitted = true;
    if (this.businessUnitForm.valid) {
      const payload = this.generatePayload(this.businessUnit);
      if (this.isNew) {
        this.referenceDataService.addBusinessUnit(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeBusinessUnits();
        });
      } else {
        this.referenceDataService.saveBusinessUnit(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeBusinessUnits();
        });
      }
    } else {
      this.toasterService.pop('error', this.getFormValidationErrors(this.businessUnitForm));
    }
  }

  add() {
    this.isNew = true;
    this.businessUnit = {};
    const row = {};
    row['isEdit'] = true;
    row['values'] = this.businessUnit;
    this.rows.splice(0, 0, row);
    this.setPage(1);
  }
}
