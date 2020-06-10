import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';

export interface MunicipalityRepository {
  list: () => Promise<MunicipalitySummary[]>;
}
