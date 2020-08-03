import { AdministrativeDivisionTypes } from '../administrative-division/AdministrativeDivisionTypes';

import { AdministrativeDivisionDailyReport } from './AdministrativeDivisionDailyReport';

export interface AdministrativeDivisionDailyReportRepository {
  listForAdministrativeDivision: (
    type: AdministrativeDivisionTypes,
    AdministrativeDivisionId: string
  ) => Promise<AdministrativeDivisionDailyReport[]>;
}
