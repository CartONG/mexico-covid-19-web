import { AxiosInstance } from 'axios';

import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { NotFound } from '@/domain/NotFound';
import { RestMunicipalitySummary, toMunicipalitySummary } from '@/secondary/municipality/RestMunicipalitySummary';

export class RestMunicipalityRepository implements MunicipalityRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(): Promise<MunicipalitySummary[]> {
    return this.axiosInstance
      .get<RestMunicipalitySummary[]>('municipalities.json')
      .then(response => response.data.map(toMunicipalitySummary))
      .catch(error => {
        throw new NotFound('municipality summary').cause(error);
      });
  }
}
