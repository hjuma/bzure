import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AssetDashboardComponent } from './components/asset-dashboard/asset-dashboard.component';
import { ReferenceDataComponent } from './components/reference-data/reference-data.component';
import { RuleSetsComponent } from './components/rule-sets/rule-sets.component';
import { SecurityComponent } from './components/security/security.component';
import { DataQualityComponent } from './components/data-quality/data-quality.component';
import { DataQualityWorkOrderComponent } from './components/data-quality-work-order/data-quality-work-order.component';
import { AssetReferenceDataComponent } from './components/reference-data/asset-reference-data.component/asset-reference-data.component';
import { FacilityReferenceDataComponent } from './components/reference-data/facility-reference-data.component/facility-reference-data.component';
import { BarrierElementReferenceDataComponent } from './components/reference-data/barrier-element-reference-data.component/barrier-element-reference-data.component';
import { BarrierTypeReferenceDataComponent } from './components/reference-data/barrier-type-reference-data.component/barrier-type-reference-data.component';
import { BusinessUnitReferenceDataComponent } from './components/reference-data/business-unit-reference-data.component/business-unit-reference-data.component';
import { BarrierReferenceDataComponent } from './components/reference-data/barrier-reference-data.component/barrier-reference-data.component';
import { FacilityDashboardComponent } from './components/facility-dashboard/facility-dashboard.component';
import { AuthenticationGuard } from './core/services/authentication-guard';
import { FacilityWorkOrderComponent } from './components/facility-work-order/facility-work-order.component';
import { AssetRuleSetComponent } from './components/rule-sets/asset-rule-set/asset-rule-set.component';
import { FacilityRuleSetComponent } from './components/rule-sets/facility-rule-set/facility-rule-set.component';
import { AssetRuleSetHistoryComponent } from './components/rule-sets/asset-rule-set-history/asset-rule-set-history.component';
import { FacilityRuleSetHistoryComponent } from './components/rule-sets/facility-rule-set-history/facility-rule-set-history.component';
import { UserManagementComponent } from './components/security/user-management/user-management.component';
import { UserResolve } from './core/route-resolvers/user-resolve';
import { UnSavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { ApplicationDataResolver } from './components/no-application-data/application-data-resolver';
import { NoApplicationDataComponent } from './components/no-application-data/no-application-data.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticationGuard],
        canActivateChild: [AuthenticationGuard],
        children: [
            {
                path: 'no-application-data-found',
                component: NoApplicationDataComponent
            },
            {
                path: '',
                component: AssetDashboardComponent,
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'facility/:id',
                component: FacilityDashboardComponent,
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'facility/:id/:barrierTypeId/:metricTypeId/:ragStatus',
                component: FacilityWorkOrderComponent,
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'data-quality',
                component: DataQualityComponent,
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'data-quality/:id/:barrierTypeId/:metricTypeId',
                component: DataQualityWorkOrderComponent,
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'reference-data',
                component: ReferenceDataComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'asset'
                    },
                    {
                        path: 'asset',
                        component: AssetReferenceDataComponent
                    },
                    {
                        path: 'facility',
                        component: FacilityReferenceDataComponent
                    },
                    {
                        path: 'barrier',
                        component: BarrierReferenceDataComponent
                    },
                    {
                        path: 'barrier-element',
                        component: BarrierElementReferenceDataComponent
                    },
                    {
                        path: 'barrier-type',
                        component: BarrierTypeReferenceDataComponent
                    },
                    {
                        path: 'business-unit',
                        component: BusinessUnitReferenceDataComponent
                    }
                ]
            },
            {
                path: 'rule-sets',
                component: RuleSetsComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'asset'
                    },
                    {
                        path: 'asset',
                        component: AssetRuleSetComponent
                    },
                    {
                        path: 'facility',
                        component: FacilityRuleSetComponent
                    }
                ],
                resolve: {
                    data: ApplicationDataResolver
                }
            },
            {
                path: 'rule-set/history/asset/:barrier_id',
                component: AssetRuleSetHistoryComponent
            },
            {
                path: 'rule-set/history/facility/:barrier_id/:barrier_metric_id',
                component: FacilityRuleSetHistoryComponent
            },
            {
                path: 'security',
                component: SecurityComponent,
            },
            {
                path: 'security/add-user',
                component: UserManagementComponent,
                canDeactivate: [UnSavedChangesGuard],
                data: {
                    isNew: true
                }
            },
            {
                path: 'security/edit-user/:id',
                component: UserManagementComponent,
                canDeactivate: [UnSavedChangesGuard],
                data: {
                    isNew: false
                },
                resolve: {
                    user: UserResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
