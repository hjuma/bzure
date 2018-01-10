import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FacilityService } from '../../core/services/facility.service';
import { MetadataService } from '../../core/services/metadata.service';
import { Facility } from '../../core/models/facility';
import { Barrier } from '../../core/models/barrier';
import { BarrierElement } from '../../core/models/barrier-element';
import { BarrierMetric } from '../../core/models/barrier-metric';
import { BarrierType } from '../../core/models/barrier-type';
import { Asset } from '../../core/models/asset';
import { AssetService } from '../../core/services/asset.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-data-quality',
  templateUrl: './data-quality.component.html',
  styleUrls: ['./data-quality.component.scss']
})
export class DataQualityComponent implements OnInit {

  barriers: Array<Barrier>;
  assets: Array<Asset>;
  selectedAsset: Asset;
  facilities: Array<Facility>;
  selectedFacility: Facility;
  barrierElements: Array<BarrierElement>;
  facilityDetails: Facility;

  constructor(private route: ActivatedRoute,
    private facilityService: FacilityService,
    private metadataService: MetadataService, private assetService: AssetService, private router: Router) {
  }

  ngOnInit() {

    this.assetService.getAssets().subscribe((response: Array<Asset>) => {
      this.assets = response;
      this.route.queryParams.subscribe(params => {
        const assetId = parseInt(params['assetId'], 0) || 0;
        const facilityId = parseInt(params['facilityId'], 0) || 0;
        if (assetId !== 0 || facilityId !== 0) {
          this.initializeAssetAndFacilities(assetId, facilityId);
        } else {
          this.selectedAsset = this.assets.find(function(a) {
            return a.Facilities.length > 1;
          });
          this.facilities = this.selectedAsset.Facilities.filter(function(f) {
            return f.FacilityLevelData.length > 0;
          }) || [];
          this.selectedFacility = this.facilities[0];
        }
        this.onFacilityChange();
      });

    });
  }

  private initializeAssetAndFacilities(assetId, facilityId) {
    let assetElement;
    let facilityElement;
    if (assetId !== 0) {
      assetElement = this.assets.filter(asset => {
        if (assetId === asset.id) {
          return asset;
        }
      });
    }
    if (assetElement) {
      this.selectedAsset = assetElement[0];
    }
    this.facilities = this.selectedAsset.Facilities.filter(function(f) {
          return f.FacilityLevelData.length > 0;
      }) || [];
    this.selectedFacility = this.facilities[0];
    if (facilityId !== 0) {
      facilityElement = this.facilities.filter(facility => {
        if (facilityId === facility.id) {
          return facility;
        }
      });
    }
    if (facilityElement) {
      this.selectedFacility = facilityElement[0];
    }
  }

  onFacilityChange() {
    if (this.selectedFacility) {
        const facilityId = this.selectedFacility.id.toString();
        this.facilityService.getFacilityById(facilityId).subscribe((facility:Facility) => {
            this.facilityDetails = facility;
            this.metadataService.getAllBarriers(+facility.asset_id).subscribe((barriers: Array<Barrier>) => {
                this.barriers = barriers;
                this.metadataService.getAllBarrierElements().subscribe((elements: Array<BarrierElement>) => {
                    this.barrierElements = elements;
                });
            });
        });
    }
  }

  onClick(metric: BarrierMetric, barrierType: BarrierType) {
    this.router.navigate(['/home/data-quality/', this.selectedFacility.id, barrierType.id, metric.id]);
    console.log(`api/v1/facilities/${this.selectedFacility.id}/${barrierType.id}/${metric.id}`);
  }

  onAssetChange() {
      this.facilities = this.selectedAsset.Facilities.filter(function(f) {
          return f.FacilityLevelData.length > 0;
      }) || [];
    this.selectedFacility = this.facilities[0];
    this.onFacilityChange();
  }

  getCountForBarrierMetric(metric: BarrierMetric, barrierType: BarrierType) {

    const count = this.facilityDetails.FacilityLevelData.find(function (data) {
      return ((data.barrier_type_id === barrierType.id && data.barrier_metric_id === metric.id)
        && (data.barrier_metric_id === -1 || data.barrier_type_id < 0));
    });

    const tooltip = isNullOrUndefined(count) ? '' : 'Drill down to view ' + count.count_of_data
      + ' work orders that are categorised as ' + metric.name + ' in the ' + barrierType.name + ' barrier type';

    return isNullOrUndefined(count) ? { count: undefined } : { count: count.count_of_data, tooltip: tooltip };
  }

}
