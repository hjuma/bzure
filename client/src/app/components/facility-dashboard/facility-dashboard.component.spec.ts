import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardComponent } from './facility-dashboard.component';
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {MetadataService} from '../../core/services/metadata.service';
import {MockMetadataService} from '../../testing/mock-metadata.service';
import {FacilityService} from '../../core/services/facility.service';
import {MockFacilityService} from '../../testing/mock-facility.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

describe('FacilityDashboardComponent', () => {
    let component: FacilityDashboardComponent;
    let fixture: ComponentFixture<FacilityDashboardComponent>;
    let activatedRoute = new ActivatedRouteStub();

    activatedRoute.testParamMap = Observable.of({id: 1});

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FacilityDashboardComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
            imports: [ RouterTestingModule ],
            providers: [
                {
                  provide: MetadataService, useClass: MockMetadataService
                },
                {
                  provide: FacilityService, useClass: MockFacilityService
                },
                {
                  provide: ActivatedRoute, useValue: activatedRoute
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FacilityDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should return a valid count and rag status for a barrier metric / barrier', () => {
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

        const barrierMetric = {
            id: 1,
            barrier_element_id: 1,
            name: 'Test',
            description: 'Test',
            use_barriers: true,
            green_on_no_data: true,
            display_order: 1,
        };

        component.selectedFacility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            FacilityLevelData: [{
                snapshot_date: Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                barrier_metric_id: 1,
                count_of_data: 10,
                rag_status: 'R',
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
                },
                BarrierMetric: {
                    id: 1,
                    barrier_element_id: 1,
                    name: 'Test',
                    description: 'Test',
                    use_barriers: true,
                    green_on_no_data: true,
                    display_order: 1,
                }
            }],
            AssetLevelData:[]
        };

        const count = component.getCountForBarrierMetric(barrierMetric, barrierType);
        
        expect(count.rag).toEqual('R');
        expect(count.count).toEqual(10);
    });

    it('should return a valid G and 0 for no data if green on no data is true', () => {
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

        const barrierMetric = {
            id: 2,
            barrier_element_id: 1,
            name: 'Test',
            description: 'Test',
            use_barriers: true,
            green_on_no_data: true,
            display_order: 1,
        };

        component.selectedFacility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            FacilityLevelData: [{
                snapshot_date: Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                barrier_metric_id: 1,
                count_of_data: 10,
                rag_status: 'R',
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
                },
                BarrierMetric: {
                    id: 1,
                    barrier_element_id: 1,
                    name: 'Test',
                    description: 'Test',
                    use_barriers: true,
                    green_on_no_data: true,
                    display_order: 1,
                }
            }],
            AssetLevelData:[]
        };

        const count = component.getCountForBarrierMetric(barrierMetric, barrierType);

        expect(count.rag).toEqual('G');
        expect(count.count).toEqual(0);
    });

    it('should return no RAG and 0 for no data if green on no data is false', () => {
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

        const barrierMetric = {
            id: 2,
            barrier_element_id: 1,
            name: 'Test',
            description: 'Test',
            use_barriers: true,
            green_on_no_data: false,
            display_order: 1,
        };

        component.selectedFacility = {
            id: 1,
            code: 'Test',
            asset_id: 1,
            name: 'Test',
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            FacilityLevelData: [{
                snapshot_date: Date.now(),
                facility_id: 1,
                barrier_type_id: 1,
                barrier_metric_id: 1,
                count_of_data: 10,
                rag_status: 'R',
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
                },
                BarrierMetric: {
                    id: 1,
                    barrier_element_id: 1,
                    name: 'Test',
                    description: 'Test',
                    use_barriers: true,
                    green_on_no_data: false,
                    display_order: 1,
                }
            }],
            AssetLevelData:[]
        };

        const count = component.getCountForBarrierMetric(barrierMetric, barrierType);

        expect(count.rag).toEqual('');
        expect(count.count).toEqual(0);
    });
});
