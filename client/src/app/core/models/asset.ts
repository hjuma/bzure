import { Facility } from './facility';
import { AssetLevelData } from './asset-level-data';
import { BusinessUnit } from './business-unit';
import { FacilityLevelData } from './facility-level-data';

export interface Asset {
  id: number;
  code: string;
  name: string;
  business_unit_id: number;
  Facilities: Array<Facility>;
  created_at: number;
  updated_at: number;
  AssetLevelData?: Array<AssetLevelData>;
  FacilityLevelData?: Array<FacilityLevelData>;
  BusinessUnit?: BusinessUnit;
}
