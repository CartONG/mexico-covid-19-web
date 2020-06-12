import { AxiosInstance } from 'axios';

import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { NotFound } from '@/domain/NotFound';
import { RestMunicipalitySummary, toMunicipalitySummary } from '@/secondary/municipality/RestMunicipalitySummary';

export class RestMunicipalityRepository implements MunicipalityRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(): Promise<MunicipalitySummary[]> {
    const url = process.env.NODE_ENV === 'development' ? 'municipalities.json' : 'municipios';
    return this.axiosInstance
      .get<RestMunicipalitySummary[]>(url)
      .then(response => response.data.map(toMunicipalitySummary))
      .catch(error => {
        throw new NotFound('municipality summary').cause(error);
      });
  }
}
