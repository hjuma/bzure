import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ApplicationDataResolver } from './components/no-application-data/application-data-resolver';
import { PaginationService } from './core/services/pagination.service';
import { AssetService } from './core/services/asset.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AssetDashboardComponent } from './components/asset-dashboard/asset-dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ReferenceDataComponent } from './components/reference-data/reference-data.component';
import { RuleSetsComponent } from './components/rule-sets/rule-sets.component';
import { SecurityComponent } from './components/security/security.component';
import { DataQualityComponent } from './components/data-quality/data-quality.component';
import { DataQualityWorkOrderComponent } from './components/data-quality-work-order/data-quality-work-order.component';
import { FacilityDashboardComponent } from './components/facility-dashboard/facility-dashboard.component';
import { MetadataService } from './core/services/metadata.service';
import { FacilityService } from './core/services/facility.service';
import { AuthenticationService } from './core/services/authentication.service';
import { AuthenticationInterceptor } from './core/services/authentication-interceptor';
import { AuthenticationGuard } from './core/services/authentication-guard';
import { ToasterModule } from 'angular2-toaster';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';
import { FacilityWorkOrderComponent } from './components/facility-work-order/facility-work-order.component';
import { AssetRuleSetComponent } from './components/rule-sets/asset-rule-set/asset-rule-set.component';
import { FacilityRuleSetComponent } from './components/rule-sets/facility-rule-set/facility-rule-set.component';
import { RuleSetService } from './core/services/rule-set.service';
import { ReferenceDataService } from './core/services/reference-data.service';
import { AssetRuleSetHistoryComponent } from './components/rule-sets/asset-rule-set-history/asset-rule-set-history.component';
import { FacilityRuleSetHistoryComponent } from './components/rule-sets/facility-rule-set-history/facility-rule-set-history.component';
import { UserService } from './core/services/user.service';
import { AssetReferenceDataComponent } from './components/reference-data/asset-reference-data.component/asset-reference-data.component';
import { FacilityReferenceDataComponent } from './components/reference-data/facility-reference-data.component/facility-reference-data.component';
import { BarrierElementReferenceDataComponent } from './components/reference-data/barrier-element-reference-data.component/barrier-element-reference-data.component';
import { BarrierTypeReferenceDataComponent } from './components/reference-data/barrier-type-reference-data.component/barrier-type-reference-data.component';
import { BusinessUnitReferenceDataComponent } from './components/reference-data/business-unit-reference-data.component/business-unit-reference-data.component';
import { BarrierReferenceDataComponent } from './components/reference-data/barrier-reference-data.component/barrier-reference-data.component';
import { TableSort } from './core/filter/customFilter';
import { OrderBy } from './core/filter/orderByPipe';
import { UserManagementComponent } from './components/security/user-management/user-management.component';
import { UserResolve } from './core/route-resolvers/user-resolve';
import { UnSavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { BrowserService } from './core/services/browser.service';
import { NoApplicationDataComponent } from './components/no-application-data/no-application-data.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NoApplicationDataComponent,
        AssetDashboardComponent,
        SideNavComponent,
        ReferenceDataComponent,
        RuleSetsComponent,
        SecurityComponent,
        DataQualityComponent,
        DataQualityWorkOrderComponent,
        FacilityDashboardComponent,
        FacilityWorkOrderComponent,
        AssetRuleSetComponent,
        FacilityRuleSetComponent,
        AssetRuleSetHistoryComponent,
        FacilityRuleSetHistoryComponent,
        AssetReferenceDataComponent,
        FacilityReferenceDataComponent,
        BarrierElementReferenceDataComponent,
        BarrierTypeReferenceDataComponent,
        BusinessUnitReferenceDataComponent,
        BarrierReferenceDataComponent,
        TableSort,
        OrderBy,
        UserManagementComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToasterModule
    ],
    providers: [
        AssetService,
        PaginationService,
        MetadataService,
        FacilityService,
        UserService,
        UserResolve,
        RuleSetService,
        ReferenceDataService,
        AuthenticationGuard,
        UnSavedChangesGuard,
        BrowserService,
        AuthenticationService,
        ApplicationDataResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
