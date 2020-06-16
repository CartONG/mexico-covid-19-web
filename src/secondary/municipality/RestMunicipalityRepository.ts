import { AxiosInstance } from 'axios';

import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { NotFound } from '@/domain/NotFound';
import { RestMunicipality, toMunicipality } from '@/secondary/municipality/RestMunicipality';
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

  find(municipalityId: string) {
    const restMunicipalityId = municipalityId.substring(2);
    const restStateId = municipalityId.substring(0, 2);
    const url =
      process.env.NODE_ENV === 'development' ? 'municipality.json' : `municipios/?cod_entidad=${restStateId}&cod_mun=${restMunicipalityId}`;
    return this.axiosInstance
      .get<RestMunicipality>(url)
      .then(response => toMunicipality(response.data))
      .catch(error => {
        throw new NotFound('municipality').cause(error);
      });
  }
}
