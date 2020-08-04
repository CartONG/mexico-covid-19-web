import { AxiosInstance } from 'axios';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivisionDailyReportRepository } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReportRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { NotFound } from '@/domain/NotFound';
import {
  RestAdministrativeDivisionDailyReport,
  toAdministrativeDivisionHistory,
} from '@/secondary/administrative-division-daily-report/RestAdministrativeDivisionDailyReport';

const listForAdministrativeDivisionUrl = (type: AdministrativeDivisionTypes, administrativeDivisionId: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return process.env.NODE_ENV === 'development' ? 'country_history.json' : 'pais/historico';
    case AdministrativeDivisionTypes.STATE:
      return process.env.NODE_ENV === 'development' ? 'state_history.json' : `entidades/historico?cod_entidad=${administrativeDivisionId}`;
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return process.env.NODE_ENV === 'development'
        ? 'municipality_history.json'
        : `municipios/historico/?cod_entidad=${administrativeDivisionId.substring(0, 2)}&cod_mun=${administrativeDivisionId.substring(2)}`;
  }
};

export class RestAdministrativeDivisionDailyReportRepository implements AdministrativeDivisionDailyReportRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  listForAdministrativeDivision(
    type: AdministrativeDivisionTypes,
    administrativeDivisionId: string
  ): Promise<AdministrativeDivisionDailyReport[]> {
    const url = listForAdministrativeDivisionUrl(type, administrativeDivisionId);
    return this.axiosInstance
      .get<RestAdministrativeDivisionDailyReport[]>(url)
      .then(response => response.data.map(toAdministrativeDivisionHistory))
      .catch(error => {
        throw new NotFound(`administrative division daily reports [${type}]`).cause(error);
      });
  }
}
