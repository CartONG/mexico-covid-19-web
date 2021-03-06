import { AxiosInstance } from 'axios';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivisionDailyReportRepository } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReportRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { NotFound } from '@/domain/NotFound';
import {
  RestAdministrativeDivisionDailyReport,
  toAdministrativeDivisionHistory,
} from '@/secondary/administrative-division-daily-report/RestAdministrativeDivisionDailyReport';

const listForAdministrativeDivisionUrl = (type: AdministrativeDivisionTypes, administrativeDivisionId: string, environment: string) => {
  switch (type) {
    case AdministrativeDivisionTypes.COUNTRY:
      return environment === 'development' ? 'country_history.json' : 'countryHistory.json';
    case AdministrativeDivisionTypes.STATE:
      return environment === 'development' ? 'state_history.json' : `${administrativeDivisionId}/stateHistory.json`;
    case AdministrativeDivisionTypes.MUNICIPALITY:
      return environment === 'development'
        ? 'municipality_history.json'
        : `${administrativeDivisionId.substring(0, 2)}/${administrativeDivisionId.substring(2)}/municipalityHistory.json`;
  }
};

export class RestAdministrativeDivisionDailyReportRepository implements AdministrativeDivisionDailyReportRepository {
  constructor(private axiosInstance: AxiosInstance, private environment: string) {}

  listForAdministrativeDivision(
    type: AdministrativeDivisionTypes,
    administrativeDivisionId: string
  ): Promise<AdministrativeDivisionDailyReport[]> {
    const url = listForAdministrativeDivisionUrl(type, administrativeDivisionId, this.environment);
    return this.axiosInstance
      .get<RestAdministrativeDivisionDailyReport[]>(url)
      .then(response => response.data.map(toAdministrativeDivisionHistory))
      .catch(error => {
        throw new NotFound(`administrative division daily reports [${type}]`).cause(error);
      });
  }
}
