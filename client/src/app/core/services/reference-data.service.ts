import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Barrier } from '../models/barrier';
import { BarrierType } from '../models/barrier-type';
import { BarrierElement } from '../models/barrier-element';
import { BusinessUnit } from '../models/business-unit';
import { Facility } from '../models/facility';
import { Asset } from '../models/asset';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReferenceDataService implements OnInit {
    private API_BASE = environment.endPoints.apiBase;
    private ASSET = environment.endPoints.asset;
    private ASSETS = environment.endPoints.assets;
    private FACILITY = environment.endPoints.facility;
    private FACILITIES = environment.endPoints.facilities;
    private BARRIER = environment.endPoints.barrier;
    private BARRIERS = environment.endPoints.barriers;
    private BARRIER_ELEMENT = environment.endPoints.barrierElement;
    private BARRIER_ELEMENTS = environment.endPoints.barrierElements;
    private BUSINESS_UNIT = environment.endPoints.businessUnit;
    private BUSINESS_UNITS = environment.endPoints.businessUnits;
    private BARRIER_TYPE = environment.endPoints.barrierType;
    private BARRIER_TYPES = environment.endPoints.barrierTypes;
    private REFERENCE_DATA = environment.endPoints.referenceData;
    private ADD = environment.endPoints.add;
    private UPDATE = environment.endPoints.update;
    private DATA_EXISTENCE = environment.endPoints.dataExistence;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    getAllBusinessUnits() {
        return this.http.get<Array<BusinessUnit>>(this.API_BASE + this.REFERENCE_DATA + '/' + this.BUSINESS_UNITS);
    }

    saveBusinessUnit(businessUnit: any): Observable<any> {
        return this.http.post<Array<BusinessUnit>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BUSINESS_UNIT + '/' + this.UPDATE + `/${businessUnit.id}`, businessUnit);
    }

    addBusinessUnit(businessUnit: any): Observable<any> {
        return this.http.post<Array<BusinessUnit>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BUSINESS_UNIT + '/' + this.ADD, businessUnit);
    }

    getBarriers() {
        return this.http.get<Array<Barrier>>(this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIERS);
    }

    saveBarrier(barrier: any): Observable<any> {
        return this.http.post<Array<Barrier>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER + '/' + this.UPDATE + `/${barrier.id}`, barrier);
    }

    addBarrier(barrier: any): Observable<any> {
        return this.http.post<Array<Barrier>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER + '/' + this.ADD, barrier);
    }

    getAllBarrierElements() {
        return this.http.get<Array<BarrierElement>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_ELEMENTS);
    }

    saveBarrierElement(barrierElement: any): Observable<any> {
        return this.http.post<Array<BarrierElement>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_ELEMENT + '/' + this.UPDATE + `/${barrierElement.id}`, barrierElement);
    }

    addBarrierElement(barrierElement: any): Observable<any> {
        return this.http.post<Array<BarrierElement>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_ELEMENT + '/' + this.ADD, barrierElement);
    }


    getAllBarrierTypes() {
        return this.http.get<Array<BarrierType>>(this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_TYPES);
    }

    saveBarrierType(barrierType: any): Observable<any> {
        return this.http.post<Array<BarrierType>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_TYPE + '/' + this.UPDATE + `/${barrierType.id}`, barrierType);
    }

    addBarrierType(barrierType: any): Observable<any> {
        return this.http.post<Array<BarrierType>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.BARRIER_TYPE + '/' + this.ADD, barrierType);
    }

    getAllAssets() {
        return this.http.get<Array<Asset>>(this.API_BASE + this.REFERENCE_DATA + '/' + this.ASSETS);
    }

    saveAsset(asset: any): Observable<any> {
        return this.http.post<Array<Asset>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.ASSET + '/' + this.UPDATE + `/${asset.id}`, asset);
    }

    addAsset(asset: any): Observable<any> {
        return this.http.post<Array<Asset>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.ASSET + '/' + this.ADD, asset);
    }

    getAllFacilties() {
        return this.http.get<Array<Facility>>(this.API_BASE + this.REFERENCE_DATA + '/' + this.FACILITIES);
    }

    saveFacility(facility: any): Observable<any> {
        return this.http.post<Array<Facility>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.FACILITY + '/' + this.UPDATE + `/${facility.id}`, facility);
    }

    addFacility(facility: any): Observable<any> {
        return this.http.post<Array<Facility>>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.FACILITY + '/' + this.ADD, facility);
    }

    checkApplicationDataExistence(): Observable<any> {
        return this.http.get<any>
            (this.API_BASE + this.REFERENCE_DATA + '/' + this.DATA_EXISTENCE);
    }

}
