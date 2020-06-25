import { AxiosInstance } from 'axios';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';
import { AdministrativeDivisionHistoryRepository } from '@/domain/administrative-division-history/AdministrativeDivisionHistoryRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { NotFound } from '@/domain/NotFound';
import {
  RestAdministrativeDivisionHistory,
  toAdministrativeDivisionHistory,
} from '@/secondary/administrative-division-history/RestAdministrativeDivisionHistory';

const listForAdministrativeDivisionUrl = (type: AdministrativeDivisionTypes, administrativeDivisionId: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return process.env.NODE_ENV === 'development' ? 'country_history.json' : 'country_history.json'; // 'pais/history';
    case AdministrativeDivisionTypes.STATE:
      return process.env.NODE_ENV === 'development' ? 'state_history.json' : `entidades/history?cod_entidad=${administrativeDivisionId}`;
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return process.env.NODE_ENV === 'development'
        ? 'municipality_history.json'
        : `municipios/history/?cod_entidad=${administrativeDivisionId.substring(0, 2)}&cod_mun=${administrativeDivisionId.substring(2)}`;
  }
};

export class RestAdministrativeDivisionHistoryRepository implements AdministrativeDivisionHistoryRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  listForAdministrativeDivision(
    type: AdministrativeDivisionTypes,
    administrativeDivisionId: string
  ): Promise<AdministrativeDivisionHistory[]> {
    const url = listForAdministrativeDivisionUrl(type, administrativeDivisionId);
    return this.axiosInstance
      .get<RestAdministrativeDivisionHistory[]>(url)
      .then(response => response.data.map(toAdministrativeDivisionHistory))
      .catch(error => {
        throw new NotFound(`administrative division history [${type}]`).cause(error);
      });
  }
}
