import { Store } from 'vuex';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { AppState } from '@/primary/app/appStoreOptions';

export class AppStore {
  constructor(private store: Store<AppState>) {}

  addAdministrativeDivision(administrativeDivision: AdministrativeDivision, administrativeDivisionType: AdministrativeDivisionTypes) {
    this.store.commit('addAdministrativeDivision', { administrativeDivision, administrativeDivisionType });
  }

  addAdministrativeDivisionHistoric(
    administrativeDivisionId: string,
    reports: AdministrativeDivisionDailyReport[],
    administrativeDivisionType: AdministrativeDivisionTypes
  ) {
    this.store.commit('addAdministrativeDivisionHistoric', { administrativeDivisionId, administrativeDivisionType, reports });
  }

  getAdministrativeDivision(id: string, administrativeDivisionType: AdministrativeDivisionTypes): AdministrativeDivision | null {
    const key = `${administrativeDivisionType}#${id}`;
    return this.store.state.administrativeDivisions[key] || null;
  }

  getAdministrativeDivisionHistoric(
    id: string,
    administrativeDivisionType: AdministrativeDivisionTypes
  ): AdministrativeDivisionDailyReport[] | null {
    const key = `${administrativeDivisionType}#${id}`;
    return this.store.state.administrativeDivisionHistories[key] || null;
  }

  addSchool(school: School) {
    this.store.commit('addSchool', school);
  }

  addSchoolHistoric(schoolId: string, reports: SchoolDailyReport[]) {
    this.store.commit('addSchoolHistoric', { schoolId, reports });
  }

  getSchool(id: string): School | null {
    return this.store.state.schools[id] || null;
  }

  getSchoolHistoric(id: string): SchoolDailyReport[] | null {
    return this.store.state.schoolHistories[id] || null;
  }

  addSchoolSummaries(municipalityId: string, summaries: SchoolSummary[]) {
    this.store.commit('addSchoolSummariesForMunicipality', { municipalityId: municipalityId, schoolSummaries: summaries });
  }

  getSchoolSummaries(municipalityId: string): SchoolSummary[] | null {
    return this.store.state.schoolSummaries[municipalityId] || null;
  }
}
