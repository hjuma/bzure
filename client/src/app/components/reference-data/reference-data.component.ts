import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TableSort } from '../../core/filter/customFilter';
import { OrderBy } from '../../core/filter/orderByPipe';
import { BusinessUnit } from '../../core/models/business-unit';
import { Barrier } from '../../core/models/barrier';
import { ReferenceDataService } from '../../core/services/reference-data.service';
import { PaginationService } from '../../core/services/pagination.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-reference-data',
  templateUrl: './reference-data.component.html',
  styleUrls: ['./reference-data.component.scss']
})
export class ReferenceDataComponent implements OnInit {

  protected filterArray: Array<Object>;
  protected chosenIndex: number;
  protected columnIndex: boolean;
  protected columnNameCheck: string;
  protected isAscending: boolean;
  protected columnName: string;
  protected isNew: boolean;
  protected submitted: boolean;
  protected headers: Array<Object>;
  protected columnFilter: object;
  protected rows: Array<Object>;
  protected pagination: Object;
  protected pagedRows: Array<Object>;
  constructor() {
  }

  ngOnInit() {
    this.filterArray = [];
    this.isAscending = true;
    this.pagination = {};
  }

  protected getFormValidationErrors(form: FormGroup): string {
    let errors = '';
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors += key + ' is ' + keyError + ',' + controlErrors[keyError] + ',';
        });
      }
    });
    return errors;
  }

  protected resetFormErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setErrors(null);
    });
  }

  protected updateFilter(index, filterText) {
    let isPresent = false;
    this.filterArray.map((elem) => {
      if (elem['index'] === index && filterText === '') {
        isPresent = true;
      } else if (elem['index'] === index && filterText !== '') {
        elem['text'] = filterText;
        isPresent = true;
      }
    });

    if (isPresent || !this.filterArray.length) {
      this.filterArray.push({ index: index, text: filterText });
    }
    this.chosenIndex = index;
    this.columnFilter = filterText;
  }

  protected sort(column, colIndex) {
    this.columnIndex = colIndex;
    if (((this.columnNameCheck === column.fieldName) || (this.columnNameCheck !== column.fieldName))
      && ((!column.isAsc && !column.isDsc) || (!column.isAsc && column.isDsc))) {
      this.headers[colIndex]['isAsc'] = true;
      this.headers[colIndex]['isDsc'] = false;
      this.isAscending = true;
    } else if (this.columnNameCheck === column.fieldName && column.isAsc && !column.isDsc) {
      this.headers[colIndex]['isAsc'] = false;
      this.headers[colIndex]['isDsc'] = true;
      this.isAscending = false;
    }

    this.headers.map((columnHeader, index) => {
      if (index !== colIndex) {
        columnHeader['isAsc'] = false;
        columnHeader['isDsc'] = false;
      }
    });
    this.columnName = column.fieldName;
    this.columnNameCheck = this.columnName;
  }

}
