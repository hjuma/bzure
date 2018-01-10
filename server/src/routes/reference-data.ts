import { referenceDataService } from '../services/reference-data';
import { BarrierInstance } from "../models/interfaces/barrier";
import { BarrierTypeInstance } from "../models/interfaces/barrier-type";
import { BusinessUnitInstance } from "../models/interfaces/business-unit";
import { Router, Request, Response, NextFunction } from 'express';
import { BarrierElementInstance } from "../models/interfaces/barrier-element";
import { AssetInstance } from "../models/interfaces/asset";
import { FacilityInstance } from "../models/interfaces/facility";

export class ReferenceDataRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAllBarrierElements(req: Request, res: Response, next: NextFunction) {
        referenceDataService.getAllBarrierElements().then((barrierElements: Array<BarrierElementInstance>) => {
            return res.send(barrierElements);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }


    public getAllBarriers(req: Request, res: Response, next: NextFunction) {
        referenceDataService.getAllBarriers().then((barriers: Array<BarrierInstance>) => {
            return res.send(barriers);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateBarrierById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateBarrier(req.params.id, req.body).then((barrier: BarrierInstance) => {
            if (barrier) {
                return res.send({
                    status: 200,
                    message: 'Barrier updated successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addBarrier(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createBarrier(req.body).then((barrier: BarrierInstance) => {
            if (barrier) {
                return res.send({
                    status: 200,
                    message: 'Barrier added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateBarrierElementById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateBarrierElement(req.params.id, req.body).then((barrierElement: BarrierElementInstance) => {
            if (barrierElement) {
                return res.send({
                    status: 200,
                    message: 'Barrier Element updated successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addBarrierElement(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createBarrierElement(req.body).then((barrier: BarrierInstance) => {
            if (barrier) {
                return res.send({
                    status: 200,
                    message: 'Barrier Element added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllBusinessUnits(req: Request, res: Response, next: NextFunction) {
        referenceDataService.retrieveBusinessUnits().then((barriers: Array<BarrierInstance>) => {
            return res.send(barriers);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateBusinessUnitById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateBusinessUnit(req.params.id, req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Business Unit updated successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addBusinessUnit(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createBusinessUnit(req.body).then((barrier: BarrierInstance) => {
            if (barrier) {
                return res.send({
                    status: 200,
                    message: 'Business Unit added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }


    public getAllBarrierTypes(req: Request, res: Response, next: NextFunction) {
        referenceDataService.retrieveBarrierTypes().then((barrierTypes: Array<BarrierTypeInstance>) => {
            return res.send(barrierTypes);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateBarrierTypeById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateBarrierType(req.params.id, req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Barrier Type updated successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addBarrierType(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createBarrierType(req.body).then((barrierType: BarrierTypeInstance) => {
            if (barrierType) {
                return res.send({
                    status: 200,
                    message: 'Barrier Type added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllAssets(req: Request, res: Response, next: NextFunction) {
        referenceDataService.getAllAssets().then((assets: Array<AssetInstance>) => {
            return res.send(assets);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateAssetById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateAsset(req.params.id, req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Asset updated successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addAsset(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createAsset(req.body).then((asset: AssetInstance) => {
            if (asset) {
                return res.send({
                    status: 200,
                    message: 'Asset added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getAllFacilities(req: Request, res: Response, next: NextFunction) {
        referenceDataService.getAllFacilities().then((facilities: Array<FacilityInstance>) => {
            return res.send(facilities);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateFacilityById(req: Request, res: Response, next: NextFunction) {
        referenceDataService.updateFacility(req.params.id, req.body).then(() => {
            return res.send({
                status: 200,
                message: 'Facility updated successfully.'
            });
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addFacility(req: Request, res: Response, next: NextFunction) {
        referenceDataService.createFacility(req.body).then((facility: FacilityInstance) => {
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


    public checkApplicationDataExistence(req: Request, res: Response, next: NextFunction) {
        referenceDataService.checkApplicationDataExistence().then(count_of_entites => {
            return res.send(count_of_entites);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }




    init() {
        this.router.get('/barriers', this.getAllBarriers);
        this.router.post('/barrier/add', this.addBarrier);
        this.router.post('/barrier/update/:id', this.updateBarrierById);
        this.router.get('/barrier-types', this.getAllBarrierTypes);
        this.router.post('/barrier-type/add', this.addBarrierType);
        this.router.post('/barrier-type/update/:id', this.updateBarrierTypeById);
        this.router.get('/barrier-elements', this.getAllBarrierElements);
        this.router.post('/barrier-element/add', this.addBarrierElement);
        this.router.post('/barrier-element/update/:id', this.updateBarrierElementById);
        this.router.get('/business-units', this.getAllBusinessUnits);
        this.router.post('/business-unit/add', this.addBusinessUnit);
        this.router.post('/business-unit/update/:id', this.updateBusinessUnitById);
        this.router.get('/assets', this.getAllAssets);
        this.router.post('/asset/add', this.addAsset);
        this.router.post('/asset/update/:id', this.updateAssetById);
        this.router.get('/facilities', this.getAllFacilities);
        this.router.post('/facility/add', this.addFacility);
        this.router.post('/facility/update/:id', this.updateFacilityById);
        this.router.get('/app-data-exist', this.checkApplicationDataExistence);
    }

}

const referenceDataRoutes = new ReferenceDataRouter();

referenceDataRoutes.init();

export default referenceDataRoutes.router;