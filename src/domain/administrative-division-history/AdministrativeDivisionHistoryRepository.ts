import { AdministrativeDivisionTypes } from '../administrative-division/AdministrativeDivisionTypes';

import { AdministrativeDivisionHistory } from './AdministrativeDivisionHistory';

export interface AdministrativeDivisionHistoryRepository {
  listForAdministrativeDivision: (
    type: AdministrativeDivisionTypes,
    AdministrativeDivisionId: string
  ) => Promise<AdministrativeDivisionHistory[]>;
}
