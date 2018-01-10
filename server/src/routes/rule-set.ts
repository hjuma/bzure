import { ruleSetService } from '../services/rule-set';
import { FacilityRuleSetInstance } from "../models/interfaces/facility-rule-set";
import { Router, Request, Response, NextFunction } from 'express';
import { loginRoutes } from './login';
import {AssetRuleSetInstance} from "../models/interfaces/asset-rule-set";

export class RuleSetRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAllFacility(req: Request, res: Response, next: NextFunction) {
        ruleSetService.retrievefacilityRuleset().then((ruleSet: Array<FacilityRuleSetInstance>) => {
            return res.send(ruleSet);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllFacilityHistory(req: Request, res: Response, next: NextFunction) {
        ruleSetService.retrieveFacilityRulesetHistory(req.params['barrier_id'], req.params['barrier_metric_id']).then((ruleSet: Array<FacilityRuleSetInstance>) => {
            return res.send(ruleSet);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }


    public getAllAsset(req: Request, res: Response, next: NextFunction) {
        ruleSetService.retrieveAssetRuleset().then((ruleSet: Array<AssetRuleSetInstance>) => {
            return res.send(ruleSet);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllAssetHistory(req: Request, res: Response, next: NextFunction) {
        ruleSetService.retrieveAssetRulesetHistory(req.params['barrier_id']).then((ruleSet: Array<AssetRuleSetInstance>) => {
            return res.send(ruleSet);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateAsset(req: Request, res: Response, next: NextFunction) {
        ruleSetService.updateAssetRuleSet(req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Asset ruleset saved successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateFacility(req: Request, res: Response, next: NextFunction) {
        ruleSetService.updateFacilityRuleSet(req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Facility ruleset saved successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
        this.router.get('/facility', this.getAllFacility);
        this.router.put('/facility', this.updateFacility);
        this.router.get('/asset', this.getAllAsset);
        this.router.put('/asset', this.updateAsset);
        this.router.get('/asset/history/:barrier_id', this.getAllAssetHistory);
        this.router.get('/facility/history/:barrier_id/:barrier_metric_id', this.getAllFacilityHistory);
    }

}

const ruleSetRoutes = new RuleSetRouter();
ruleSetRoutes.init();

export default ruleSetRoutes.router;