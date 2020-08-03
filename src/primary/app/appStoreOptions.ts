import { StoreOptions } from 'vuex';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface AppState {
  administrativeDivisions: { [key: string]: AdministrativeDivision };
  administrativeDivisionHistories: { [key: string]: AdministrativeDivisionDailyReport[] };
  schools: { [key: string]: School };
  schoolSummaries: { [key: string]: SchoolSummary[] };
}

export const appStoreOptions: StoreOptions<AppState> = {
  state: {
    administrativeDivisions: {},
    administrativeDivisionHistories: {},
    schools: {},
    schoolSummaries: {},
  },
  mutations: {
    addAdministrativeDivision(
      appState: AppState,
      options: {
        administrativeDivisionType: AdministrativeDivisionTypes;
        administrativeDivision: AdministrativeDivision;
      }
    ) {
      const key = `${options.administrativeDivisionType}#${options.administrativeDivision.id}`;
      appState.administrativeDivisions[key] = options.administrativeDivision;
    },
    addAdministrativeDivisionHistoric(
      appState: AppState,
      options: {
        administrativeDivisionId: string;
        administrativeDivisionType: AdministrativeDivisionTypes;
        reports: AdministrativeDivisionDailyReport[];
      }
    ) {
      const key = `${options.administrativeDivisionType}#${options.administrativeDivisionId}`;
      appState.administrativeDivisionHistories[key] = options.reports;
    },
    addSchool(appState: AppState, school: School) {
      appState.schools[school.id] = school;
    },
    addSchoolSummariesForMunicipality(
      appState: AppState,
      schoolSummariesForMunicipality: { municipalityId: string; schoolSummaries: SchoolSummary[] }
    ) {
      appState.schoolSummaries[schoolSummariesForMunicipality.municipalityId] = schoolSummariesForMunicipality.schoolSummaries;
    },
  },
};
