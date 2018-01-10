import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Asset} from '../core/models/asset';

export class MockAssetService {

    getAssets() {
        const assets = Array<Asset>();
        
        assets.push({
            id: 1,
            code: 'TEST',
            name: 'TEST',
            business_unit_id: 1,
            Facilities: [],
            created_at: Date.now(),
            updated_at: Date.now(),
            AssetLevelData:[],
            BusinessUnit: {
                id: 1,
                name: 'TEST',
                description: 'TEST',
                created_at: Date.now(),
                updated_at: Date.now()
            }
        });
        
        return Observable.of(assets);
    }

    saveAsset() {

    }

    addAsset() {

    }
}