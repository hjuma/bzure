import { assetService } from '../services/asset';
import { AssetInstance } from "../models/interfaces/asset";
import { Router, Request, Response, NextFunction } from 'express';
import { loginRoutes } from './login';

export class AssetRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        assetService.retrieveAssets().then((assets: Array<AssetInstance>) => {
            return res.send(assets);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        assetService.retrieveAssetById(req.params.id).then((asset: AssetInstance) => {
            return res.send(asset);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateAssetById(req: Request, res: Response, next: NextFunction) {
        assetService.updateAssets(req.params.id, req.body).then((results: number) => {
            if (results) {
                return res.send({
                    status: 200,
                    message: 'Asset updated successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addAsset(req: Request, res: Response, next: NextFunction) {
        assetService.createAsset(req.body).then((asset: AssetInstance) => {
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


    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getAll);
        this.router.post('/update/:id', this.updateAssetById);
        this.router.post('/add', this.addAsset);
    }

}

const assetRoutes = new AssetRouter();
assetRoutes.init();

export default assetRoutes.router;