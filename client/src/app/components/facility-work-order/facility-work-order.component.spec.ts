import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilityWorkOrderComponent } from './facility-work-order.component';
import { RouterOutletStubComponent} from '../../testing/router-stubs';
import  {RouterLinkStubDirective } from '../../testing/router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {FacilityService} from '../../core/services/facility.service';
import {MockFacilityService} from '../../testing/mock-facility.service';

describe('FacilityWorkOrderComponent', () => {
    let component: FacilityWorkOrderComponent;
    let fixture: ComponentFixture<FacilityWorkOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FacilityWorkOrderComponent, RouterLinkStubDirective, RouterOutletStubComponent
                ],
            imports: [RouterTestingModule],
            providers: [
                {
                  provide: FacilityService, useClass: MockFacilityService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FacilityWorkOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
