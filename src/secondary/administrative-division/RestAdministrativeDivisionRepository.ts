import { AxiosInstance } from 'axios';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { NotFound } from '@/domain/NotFound';
import { RestAdministrativeDivision, toAdministrativeDivision } from '@/secondary/administrative-division/RestAdministrativeDivision';
import {
  RestAdministrativeDivisionSummary,
  toAdministrativeDivisionSummary,
} from '@/secondary/administrative-division/RestAdministrativeDivisionSummary';

const listUrl = (type: AdministrativeDivisionTypes, environment: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return environment === 'development' ? 'country.json' : 'pais';
    case AdministrativeDivisionTypes.STATE:
      return environment === 'development' ? 'states.json' : 'entidades';
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return environment === 'development' ? 'municipalities.json' : 'municipios';
  }
};

const findUrl = (type: AdministrativeDivisionTypes, administrativeDivisionId: string, environment: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return environment === 'development' ? 'country.json' : 'pais';
    case AdministrativeDivisionTypes.STATE:
      return environment === 'development' ? 'state.json' : `entidades?cod_entidad=${administrativeDivisionId}`;
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return environment === 'development'
        ? 'municipality.json'
        : `municipios/?cod_entidad=${administrativeDivisionId.substring(0, 2)}&cod_mun=${administrativeDivisionId.substring(2)}`;
  }
};

export class RestAdministrativeDivisionRepository implements AdministrativeDivisionRepository {
  constructor(private axiosInstance: AxiosInstance, private environment: string) {}

  find(type: AdministrativeDivisionTypes, administrativeDivisionId: string): Promise<AdministrativeDivision> {
    const url = findUrl(type, administrativeDivisionId, this.environment);
    return this.axiosInstance
      .get<RestAdministrativeDivision>(url)
      .then(response => toAdministrativeDivision(response.data, type))
      .catch(error => {
        throw new NotFound(`administrative division [${type}]`).cause(error);
      });
  }

  list(type: AdministrativeDivisionTypes): Promise<AdministrativeDivisionSummary[]> {
    const url = listUrl(type, this.environment);
    return this.axiosInstance
      .get<RestAdministrativeDivisionSummary[]>(url)
      .then(response => response.data.map(toAdministrativeDivisionSummary))
      .catch(error => {
        throw new NotFound(`administrative division summary [${type}]`).cause(error);
      });
  }
}
