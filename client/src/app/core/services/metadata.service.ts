import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Barrier } from '../models/barrier';
import { BarrierElement } from '../models/barrier-element';
import { Asset } from '../models/asset';

@Injectable()
export class MetadataService implements OnInit {
    private API_BASE = environment.endPoints.apiBase;
    private BARRIERS = environment.endPoints.barriers;
    private ASSETS = environment.endPoints.assets;
    private BARRIER = environment.endPoints.barrier;

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }

    getBarriers(asset_id: number) {
        return this.http.get<Array<Barrier>>(this.API_BASE + this.BARRIERS + `/${asset_id}`);
    }

    getBarrierElements() {
        return this.http.get<Array<BarrierElement>>(this.API_BASE + this.BARRIERS + '/elements');
    }

    getAllBarriers(asset_id: number) {
        return this.http.get<Array<Barrier>>(this.API_BASE + this.BARRIERS + '/' + this.BARRIER + `/${asset_id}`);
    }

    getAllBarrierElements() {
        return this.http.get<Array<BarrierElement>>(this.API_BASE + this.BARRIERS + '/barrier-elements');
    }

    getAssetsById(asset_id: number) {
        return this.http.get<Asset>(this.API_BASE + this.ASSETS + `/${asset_id}`);
    }


}
