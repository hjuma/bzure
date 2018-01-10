import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualityWorkOrderComponent } from './data-quality-work-order.component';
import {ActivatedRouteStub, RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {FacilityService} from '../../core/services/facility.service';
import {MockFacilityService} from '../../testing/mock-facility.service';
import {ActivatedRoute} from '@angular/router';


describe('DataQualityWorkOrderComponent', () => {
    let component: DataQualityWorkOrderComponent;
    let fixture: ComponentFixture<DataQualityWorkOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DataQualityWorkOrderComponent,RouterLinkStubDirective, RouterOutletStubComponent  ],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: FacilityService, useClass: MockFacilityService
                },
                {
                    provide: ActivatedRoute, useClass: ActivatedRouteStub
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataQualityWorkOrderComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        fixture.whenRenderingDone().then(()=> {
            expect(component).toBeTruthy();
        });

    });
});
