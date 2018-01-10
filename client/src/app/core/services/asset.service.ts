import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Asset } from '../models/asset';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssetService implements OnInit {
  private API_BASE = environment.endPoints.apiBase;
  private ASSETS = environment.endPoints.assets;
  private ADD_ASSET = environment.endPoints.add;
  private UPDATE_ASSET = environment.endPoints.update;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAssets() {
    return this.http.get<Array<Asset>>(this.API_BASE + this.ASSETS);
  }

  saveAsset(asset: any): Observable<any> {
    return this.http.post<Asset>(this.API_BASE + this.ASSETS + '/' + this.UPDATE_ASSET + `/${asset.id}`, asset);
}

  addAsset(asset: any): Observable<any> {
    return this.http.post<Asset>(this.API_BASE + this.ASSETS + '/' + this.ADD_ASSET, asset);
  }

}
