import { facilityService } from '../services/facility';
import { FacilityInstance } from "../models/interfaces/facility";
import { WorkOrderLevelDataInstance } from "../models/interfaces/work-order-level-data";
import { Router, Request, Response, NextFunction } from 'express';
import { BarrierElementFieldInstance } from '../models/interfaces/barrier-element-field';

export class FacilityRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        facilityService.retrieveFacilities().then((facilities: Array<FacilityInstance>) => {
            return res.send(facilities);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        facilityService.retrieveFacility(req.params.id).then((facilities: FacilityInstance) => {
            if (facilities) {
                return res.send(facilities);
            } else {
                return res.sendStatus(404);
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getWorkOrderData(req: Request, res: Response, next: NextFunction) {
        facilityService.retrieveWorkOrders(req.params.id,
            req.params.barrierTypeId,
            req.params.barrierMetricId,
            req.params.ragStatus).then( (workOrders: Array<WorkOrderLevelDataInstance>) => {
            if (workOrders) {
                return res.send(workOrders);
            } else {
                return res.sendStatus(404);
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getWorkOrderDataFields(req: Request, res: Response, next: NextFunction) {
        facilityService.retrieveWorkOrderFields(req.params.id).then( (fields: Array<BarrierElementFieldInstance>) => {
            if (fields) {
                return res.send(fields);
            } else {
                return res.sendStatus(404);
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getDataQualityWorkOrderData(req: Request, res: Response, next: NextFunction) {
        facilityService.retrieveDataQualityWorkOrders(req.params.id,
            req.params.barrierTypeId,
            req.params.barrierMetricId).then( (workOrders: Array<WorkOrderLevelDataInstance>) => {
            if (workOrders) {
                return res.send(workOrders);
            } else {
                return res.sendStatus(404);
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addFacility(req: Request, res: Response, next: NextFunction) {
        facilityService.createFacility(req.body).then((facility: FacilityInstance) => {
            if (facility) {
                return res.send({
                    status: 200,
                    message: 'Facility added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateFacilityById(req: Request, res: Response, next: NextFunction) {
        facilityService.updateFacility(req.params.id, req.body).then((results) => {
            if (results) {
                return res.send({
                    status: 200,
                    message: 'Facility updated successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.get('/:id/:barrierTypeId/:barrierMetricId/:ragStatus', this.getWorkOrderData);
        this.router.get('/fields/:id', this.getWorkOrderDataFields);
        this.router.get('/:id/:barrierTypeId/:barrierMetricId', this.getDataQualityWorkOrderData);
        this.router.post('/update/:id', this.updateFacilityById);
        this.router.post('/add', this.addFacility);
    }

}

const facilityRoutes = new FacilityRouter();
facilityRoutes.init();

export default facilityRoutes.router;