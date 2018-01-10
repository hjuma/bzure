import { facilityService } from '../services/facility';
import { FacilityInstance } from "../models/interfaces/facility";
import { Router, Request, Response, NextFunction } from 'express';


export class DataQualityRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getSCEFacilities(req: Request, res: Response, next: NextFunction){
        facilityService.retrieveSCEFacilities().then((facilities: Array<FacilityInstance>) => {
            if (facilities) {
                return res.send(facilities);
            } else {
                return res.sendStatus(404);
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
       this.router.get('/', this.getSCEFacilities);
    }

}

const dataQualityRouter = new DataQualityRouter();
dataQualityRouter.init();

export default dataQualityRouter.router;