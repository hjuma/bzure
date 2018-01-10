import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDashboardComponent } from './asset-dashboard.component';
import { FormsModule} from '@angular/forms';
import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { RouterOutletStubComponent } from '../../testing/router-stubs';
import { MockAssetService } from '../../testing/mock-asset.service';
import { AssetService } from '../../core/services/asset.service';
import {MetadataService} from '../../core/services/metadata.service';
import {MockMetadataService} from '../../testing/mock-metadata.service';
import { isNullOrUndefined } from 'util';


describe('AssetDashboardComponent', () => {
    let component: AssetDashboardComponent;
    let fixture: ComponentFixture<AssetDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssetDashboardComponent,
                RouterLinkStubDirective, RouterOutletStubComponent],
            imports: [ FormsModule ],
            providers: [
                {
                  provide: AssetService, useClass: MockAssetService
                },
                {
                  provide: MetadataService, useClass: MockMetadataService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssetDashboardComponent);
        component = fixture.componentInstance;



        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('should return a valid count for a barrier type', () => {

       const facility = {
           id: 1,
           code: 'Test',
           asset_id: 1,
           name: 'Test',
           category: 'Test',
           created_at: Date.now(),
           updated_at: Date.now(),
           AssetLevelData: [{
                snapshot_date: Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                count_of_data: 10,
                rag_status: 'R',
                red_count: 5,
                amber_count: 4,
                green_count: 1,
                created_at: '',
                updated_at: '',
                BarrierType: {
                    id: 1,
                    asset_id: 1,
                    barrier_id: 1,
                    name: 'Test',
                    description: 'Test',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now()
               }
       }]
       };
       
       const barrierType = {
            id: 1,
            asset_id: 1,
            barrier_id: 1,
            name: 'Test',
            description: 'Test',
            display_order: 1,
            created_at: Date.now(),
            updated_at: Date.now()
       };

       const count = component.getCountForBarrierType(facility, barrierType);

       expect(count.rag).toEqual('R');
       expect(count.count).toEqual(10);
    });

    it('should return a green and 0 if no data found', () => {

        const facility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData: [{
                snapshot_date: Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                count_of_data: 10,
                rag_status: 'R',
                red_count: 5,
                amber_count: 4,
                green_count: 1,
                created_at: '',
                updated_at: '',
                BarrierType: {
                    id: 1,
                    asset_id: 1,
                    barrier_id: 1,
                    name: 'Test',
                    description: 'Test',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
            }]
        };

        const barrierType = {
            id: 2,
            asset_id: 1,
            barrier_id: 1,
            name: 'Test',
            description: 'Test',
            display_order: 1,
            created_at: Date.now(),
            updated_at: Date.now()
        };

        const count = component.getCountForBarrierType(facility, barrierType);

        expect(count.rag).toEqual('G');
        expect(count.count).toEqual(0);
    });

    it('load barriers for selected asset', () => {
       component.selectedAsset = {
           id: 1,
           code: 'Test',
           name: 'Test',
           business_unit_id: 1,
           Facilities: [],
           created_at: Date.now(),
           updated_at: Date.now(),
           AssetLevelData:[]
       };

       component.onAssetChange();

       expect(component.barriers.length).toEqual(0);
    });

    it('should return false indicating data is current i.e. less 24 hours old', () => {

        const facility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData: [{
                snapshot_date:Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                count_of_data: 10,
                rag_status: 'R',
                red_count: 5,
                amber_count: 4,
                green_count: 1,
                created_at: '',
                updated_at: '',
                BarrierType: {
                    id: 1,
                    asset_id: 1,
                    barrier_id: 1,
                    name: 'Test',
                    description: 'Test',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
            }]
        };

        const hasOldData = component.hasOldData(facility);


        expect(hasOldData).toEqual(false);
    });

    it('should return true indicating data is > 24 hours old', () => {

        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());

        const facility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData: [{
                snapshot_date: yesterdayNoTime.getDate(),
                facility_id: 1,
                barrier_type_id: 1,
                count_of_data: 10,
                rag_status: 'R',
                red_count: 5,
                amber_count: 4,
                green_count: 1,
                created_at: '',
                updated_at: '',
                BarrierType: {
                    id: 1,
                    asset_id: 1,
                    barrier_id: 1,
                    name: 'Test',
                    description: 'Test',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
            }]
        };

        const hasOldData = component.hasOldData(facility);

        expect(hasOldData).toEqual(true);
    });


    it('should return true if 1 or more facilities has data > 24 hours old', () => {

        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());


        component.selectedAsset = {
            id: 1,
            code: 'Test',
            name: 'Test',
            business_unit_id: 1,
            Facilities: [{
                id: 1,
                code: 'Test',
                asset_id: 1,
                name: 'Test',
                category: 'Test',
                created_at: Date.now(),
                updated_at: Date.now(),
                AssetLevelData: [{
                    snapshot_date: yesterdayNoTime.getDate(),
                    facility_id: 1,
                    barrier_type_id: 1,
                    count_of_data: 10,
                    rag_status: 'R',
                    red_count: 5,
                    amber_count: 4,
                    green_count: 1,
                    created_at: '',
                    updated_at: '',
                    BarrierType: {
                        id: 1,
                        asset_id: 1,
                        barrier_id: 1,
                        name: 'Test',
                        description: 'Test',
                        display_order: 1,
                        created_at: Date.now(),
                        updated_at: Date.now()
                    }
                }],
            }],
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData:[]
        };

        component.shouldShowLatencyAlert();

       expect(component.showLatencyAlert).toEqual(true);
    });

    it('should return false if all facilities has data < 24 hours old', () => {

        component.selectedAsset = {
            id: 1,
            code: 'Test',
            name: 'Test',
            business_unit_id: 1,
            Facilities: [{
                id: 1,
                code: 'Test',
                asset_id: 1,
                name: 'Test',
                category: 'Test',
                created_at: Date.now(),
                updated_at: Date.now(),
                AssetLevelData: [{
                    snapshot_date: Date.now(),
                    facility_id: 1,
                    barrier_type_id: 1,
                    count_of_data: 10,
                    rag_status: 'R',
                    red_count: 5,
                    amber_count: 4,
                    green_count: 1,
                    created_at: '',
                    updated_at: '',
                    BarrierType: {
                        id: 1,
                        asset_id: 1,
                        barrier_id: 1,
                        name: 'Test',
                        description: 'Test',
                        display_order: 1,
                        created_at: Date.now(),
                        updated_at: Date.now()
                    }
                }],
            }],
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData:[]
        };

        component.shouldShowLatencyAlert();

        expect(component.showLatencyAlert).toEqual(false);
    });
});
