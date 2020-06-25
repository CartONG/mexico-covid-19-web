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

const listUrl = (type: AdministrativeDivisionTypes) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return process.env.NODE_ENV === 'development' ? 'country.json' : 'pais';
    case AdministrativeDivisionTypes.STATE:
      return process.env.NODE_ENV === 'development' ? 'states.json' : 'entidades';
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return process.env.NODE_ENV === 'development' ? 'municipalities.json' : 'municipios';
  }
};

const findUrl = (type: AdministrativeDivisionTypes, administrativeDivisionId: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return process.env.NODE_ENV === 'development' ? 'country.json' : 'pais';
    case AdministrativeDivisionTypes.STATE:
      return process.env.NODE_ENV === 'development' ? 'state.json' : `entidades?cod_entidad=${administrativeDivisionId}`;
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return process.env.NODE_ENV === 'development'
        ? 'municipality.json'
        : `municipios/?cod_entidad=${administrativeDivisionId.substring(0, 2)}&cod_mun=${administrativeDivisionId.substring(2)}`;
  }
};

export class RestAdministrativeDivisionRepository implements AdministrativeDivisionRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  find(type: AdministrativeDivisionTypes, administrativeDivisionId: string): Promise<AdministrativeDivision> {
    const url = findUrl(type, administrativeDivisionId);
    return this.axiosInstance
      .get<RestAdministrativeDivision>(url)
      .then(response => toAdministrativeDivision(response.data, type))
      .catch(error => {
        throw new NotFound(`administrative division [${type}]`).cause(error);
      });
  }

  list(type: AdministrativeDivisionTypes): Promise<AdministrativeDivisionSummary[]> {
    const url = listUrl(type);
    return this.axiosInstance
      .get<RestAdministrativeDivisionSummary[]>(url)
      .then(response => response.data.map(toAdministrativeDivisionSummary))
      .catch(error => {
        throw new NotFound(`administrative division summary [${type}]`).cause(error);
      });
  }
}
