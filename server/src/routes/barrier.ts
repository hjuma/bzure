import { barrierService } from '../services/barrier';
import { BarrierInstance } from "../models/interfaces/barrier";
import { Router, Request, Response, NextFunction } from 'express';
import { BarrierElementInstance } from "../models/interfaces/barrier-element";

export class BarrierRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAllByAssetId(req: Request, res: Response, next: NextFunction) {
        barrierService.retrieveBarriers(req.params.asset_id).then((barriers: Array<BarrierInstance>) => {
            return res.send(barriers);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllBarriersByAssetId(req: Request, res: Response, next: NextFunction) {
        barrierService.retrieveAllBarriers(req.params.barrier_asset_id).then((barriers: Array<BarrierInstance>) => {
            return res.send(barriers);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllElements(req: Request, res: Response, next: NextFunction) {
        barrierService.retrieveBarrierElements().then((barrierElements: Array<BarrierElementInstance>) => {
            return res.send(barrierElements);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllBarrierElements(req: Request, res: Response, next: NextFunction) {
        barrierService.retrieveAllBarrierElements().then((barrierElements: Array<BarrierElementInstance>) => {
            return res.send(barrierElements);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }


    init() {
        this.router.get('/elements', this.getAllElements);
        this.router.get('/barrier-elements', this.getAllBarrierElements);
        this.router.get('/:asset_id', this.getAllByAssetId);
        this.router.get('/barrier/:barrier_asset_id', this.getAllBarriersByAssetId);
    }

}

const barrierRoutes = new BarrierRouter();
barrierRoutes.init();

export default barrierRoutes.router;