import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';

export interface RestAdministrativeDivisionHistory {
  date: string;
  totalEscuelasAbiertas: number;
}

export const toAdministrativeDivisionHistory = (
  restAdministrativeDivisionHistory: RestAdministrativeDivisionHistory
): AdministrativeDivisionHistory => ({
  date: restAdministrativeDivisionHistory.date,
  openSchools: restAdministrativeDivisionHistory.totalEscuelasAbiertas,
});
