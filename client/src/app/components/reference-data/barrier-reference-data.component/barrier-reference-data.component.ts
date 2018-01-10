import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TableSort } from '../../../core/filter/customFilter';
import { OrderBy } from '../../../core/filter/orderByPipe';
import { BusinessUnit } from '../../../core/models/business-unit';
import { Barrier } from '../../../core/models/barrier';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { ToasterService } from 'angular2-toaster';
import { barrierHeaders } from '../../../core/constants/reference-data-headers';
import { ReferenceDataComponent } from '../../reference-data/reference-data.component';

@Component({
  selector: 'app-barrier-reference-data',
  templateUrl: './barrier-reference-data.component.html',
  styleUrls: ['./barrier-reference-data.component.scss']
})
export class BarrierReferenceDataComponent extends ReferenceDataComponent implements OnInit {

  private barrierForm: FormGroup;
  private barrier: Object;
  private barriers: Array<Barrier>;
  private currentMaxOrder: number;

  constructor(private referenceDataService: ReferenceDataService, private formBuilder: FormBuilder,
    private toasterService: ToasterService, private paginationService: PaginationService) {
    super();
    this.currentMaxOrder = -1;
    this.barrier = {};
    this.headers = barrierHeaders;
  }

  ngOnInit() {
    super.ngOnInit();
    this.initializeForm();
    this.initializeBarriers();
    this.pagination['currentPage'] = 1;
  }

  private initializeBarriers() {
    this.referenceDataService.getBarriers().subscribe(response => {
      this.barriers = response;
      this.rows = new Array<object>();
      this.barriers.forEach(barrier => {
        const row = {};
        this.currentMaxOrder = (this.currentMaxOrder > barrier.display_order) ? this.currentMaxOrder : barrier.display_order;
        row['isEdit'] = false;
        row['values'] = barrier;
        this.rows.push(row);
      });
    }, error => { }, () => {
      this.setPage(this.pagination['currentPage']);
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
    this.barrier = row['values'];
  }

  private generatePayload(current: Object) {
    const barrier: any = {};
    barrier['code'] = current['code'];
    barrier['name'] = current['name'];
    barrier['description'] = current['description'];
    barrier['display_order'] = current['display_order'];
    if (!this.isNew) {
      barrier['id'] = current['id'];
    }
    return barrier;
  }

  cancel(row: Object) {
    if (this.isNew) {
      this.rows.splice(0, 1);
    }
    if (!this.isNew) {
      row['isEdit'] = false;
    }
    this.barrier = {};
    this.resetFormErrors(this.barrierForm);
  }

  private initializeForm() {
    this.barrierForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      columnFilter: ['']
    }
    );
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
    this.saveBarrier(objA);
    this.saveBarrier(objB);
  }

  private saveBarrier(payload: any) {
    this.referenceDataService.saveBarrier(payload).subscribe((response) => {
      this.toasterService.pop('success', response.message);
      this.initializeBarriers();
    });
  }


  save(row: Object) {
    this.submitted = true;
    if (this.barrierForm.valid) {
      const payload = this.generatePayload(this.barrier);
      if (this.isNew) {
        this.referenceDataService.addBarrier(payload).subscribe((response) => {
          this.toasterService.pop('success', response.message);
          this.initializeBarriers();
        });
      } else {
        this.saveBarrier(payload);
      }
    } else {
      this.toasterService.pop('error', this.getFormValidationErrors(this.barrierForm));
    }
  }

  add() {
    this.isNew = true;
    const row = {};
    this.barrier['display_order'] = this.currentMaxOrder + 1;
    row['isEdit'] = true;
    row['values'] = this.barrier;
    this.rows.splice(0, 0, row);
    this.setPage(1);
  }

}
