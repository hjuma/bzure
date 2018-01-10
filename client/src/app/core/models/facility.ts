import { AssetLevelData } from './asset-level-data';
import { FacilityLevelData } from './facility-level-data';
import { Asset } from './asset';

export interface Facility {
  id: number;
  code: string;
  asset_id: number;
  name: string;
  category: string;
  created_at: number;
  updated_at: number;
  Asset?: Asset;
  AssetLevelData?: Array<AssetLevelData>;
  FacilityLevelData?: Array<FacilityLevelData>;
}
