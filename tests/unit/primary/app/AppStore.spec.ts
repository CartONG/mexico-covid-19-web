import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';
import { makeAdministrativeDivisionDailyReport } from '../AdministrativeDivisionDailyReport.fixture';
import { makeSchool } from '../School.fixture';
import { makeSchoolDailyReport } from '../SchoolDailyReport.fixture';
import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { AppStore } from '@/primary/app/AppStore';
import { appStoreOptions } from '@/primary/app/appStoreOptions';

describe('AppStore', () => {
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it('should add administrative division', () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const adminDivision = makeAdministrativeDivision({ type: AdministrativeDivisionTypes.COUNTRY, id: 'country' });
    expect(appStore.getAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY)).toBeNull();
    appStore.addAdministrativeDivision(adminDivision, AdministrativeDivisionTypes.COUNTRY);
    expect(appStore.getAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY)).toEqual(adminDivision);
  });

  it('should add administrative division historic', () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const report = makeAdministrativeDivisionDailyReport();
    expect(appStore.getAdministrativeDivisionHistoric('01', AdministrativeDivisionTypes.STATE)).toBeNull();
    appStore.addAdministrativeDivisionHistoric('01', [report], AdministrativeDivisionTypes.STATE);
    expect(appStore.getAdministrativeDivisionHistoric('01', AdministrativeDivisionTypes.STATE)).toEqual([report]);
  });

  it('should add school', () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const school = makeSchool({ id: 'school' });
    expect(appStore.getSchool('school')).toBeNull();
    appStore.addSchool(school);
    expect(appStore.getSchool('school')).toEqual(school);
  });

  it('should add school historic', () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const report = makeSchoolDailyReport();
    expect(appStore.getSchoolHistoric('school')).toBeNull();
    appStore.addSchoolHistoric('school', [report]);
    expect(appStore.getSchoolHistoric('school')).toEqual([report]);
  });

  it('should add school summaries', () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const summaries = [makeSchoolSummary(), makeSchoolSummary({ id: '32KJN0045E1' })];
    expect(appStore.getSchoolSummaries('municipality')).toBeNull();
    appStore.addSchoolSummaries('municipality', summaries);
    const [first, second] = appStore.getSchoolSummaries('municipality')!;
    expect(first).toEqual<SchoolSummary>({
      id: '03DDI0003E4',
      name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
      turn: 'Discontinuo',
      locality: 'SAN JOSÉ DEL CABO',
      studentAttendance: 0.62,
      teacherAttendance: 1,
      adminAttendance: 1,
      maleStudentAbsence: 0.14,
      femaleStudentAbsence: 0.24,
      coordinates: [-109.696335, 23.054972],
    });
    expect(second).toEqual<SchoolSummary>({
      id: '32KJN0045E1',
      name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
      turn: 'Discontinuo',
      locality: 'SAN JOSÉ DEL CABO',
      studentAttendance: 0.62,
      teacherAttendance: 1,
      adminAttendance: 1,
      maleStudentAbsence: 0.14,
      femaleStudentAbsence: 0.24,
      coordinates: [-109.696335, 23.054972],
    });
  });
});
