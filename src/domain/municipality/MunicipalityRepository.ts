import { Municipality } from './Municipality';
import { MunicipalitySummary } from './MunicipalitySummary';

export interface MunicipalityRepository {
  list: () => Promise<MunicipalitySummary[]>;
  find: (municipalityId: string) => Promise<Municipality>;
}
