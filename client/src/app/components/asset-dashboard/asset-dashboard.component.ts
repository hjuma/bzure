import { Component, OnInit } from '@angular/core';
import { Asset } from '../../core/models/asset';
import { AssetService } from '../../core/services/asset.service';
import { MetadataService } from '../../core/services/metadata.service';
import { Barrier } from '../../core/models/barrier';
import { Facility } from '../../core/models/facility';
import { BarrierType } from '../../core/models/barrier-type';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-asset-dashboard',
    templateUrl: './asset-dashboard.component.html',
    styleUrls: ['./asset-dashboard.component.scss']
})
export class AssetDashboardComponent implements OnInit {
    assets: Array<Asset>;
    selectedAsset: Asset;
    barriers: Array<Barrier>;
    showCounts = false;
    showLatencyAlert = false;


    constructor(private assetService: AssetService, private metadataService: MetadataService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.assetService.getAssets().subscribe((response: Array<Asset>) => {
            this.assets = response;

            this.filterAssetData();
           
            this.route.queryParams.subscribe(params => {
                const assetId = parseInt(params['assetId'], 0) || 0;
                if (assetId !== 0) {
                    this.selectedAsset = this.assets.find(function(a) {
                        return a.id === assetId;
                    });
                }
                else {
                    this.selectedAsset = this.assets.find(function(a) {
                        return a.Facilities.length > 1;
                    });
                }
            });

            this.onAssetChange();
        });

    }

    filterAssetData() {
        this.assets.forEach(function(asset) {
           asset.Facilities = asset.Facilities.filter(function(fac) {
               return fac.FacilityLevelData.length > 0;
            })
        });
    }

    onAssetChange() {
        if (this.selectedAsset) {

            this.filterAssetData();

            this.metadataService.getBarriers(this.selectedAsset.id).subscribe((barriers: Array<Barrier>) => {
                this.barriers = barriers;

                this.shouldShowLatencyAlert();
            });
        }
    }

    getCountForBarrierType(facility: Facility, barrierType: BarrierType) {
        const count = facility.AssetLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id;
        });


        return isNullOrUndefined(count) ? { rag: 'G', count: 0} : { rag: count.rag_status, count: count.count_of_data};
    }

    hasOldData(facility: Facility) {
        let hasOldData = false;
        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());

        facility.AssetLevelData.forEach(function(count) {
            const snapshotDate = new Date(count.snapshot_date);
            const snapshotDateNoTime = new Date(snapshotDate.getFullYear(), snapshotDate.getMonth(), snapshotDate.getUTCDate());

            if (snapshotDateNoTime < yesterdayNoTime) {
                hasOldData = true;
            }

        });

        return hasOldData;
    }

    shouldShowLatencyAlert() {
        let showAlert = false;

        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());

        this.selectedAsset.Facilities.forEach(function(facility) {
            facility.AssetLevelData.forEach(function(count) {
                const snapshotDate = new Date(count.snapshot_date);
                const snapshotDateNoTime = new Date(snapshotDate.getFullYear(), snapshotDate.getMonth(), snapshotDate.getUTCDate());

                if (snapshotDateNoTime < yesterdayNoTime) {
                    showAlert = true;
                }
            });
        });

        this.showLatencyAlert = showAlert;

    }

}
