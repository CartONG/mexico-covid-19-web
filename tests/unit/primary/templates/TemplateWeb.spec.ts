import { shallowMount, Wrapper } from '@vue/test-utils';

import { stubPrinter } from '../../TestUtils';
import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';
import { makeSchool } from '../School.fixture';
import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { LocalDate } from '@/domain/date/LocalDate';
import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { TemplateWebComponent, TemplateWebVue } from '@/primary/templates/template-web';
import { Printer } from '@/secondary/Printer';

let wrapper: Wrapper<TemplateWebComponent>;
let component: TemplateWebComponent;

interface WrapperOptions {
  printer: Printer;
  administrativeLevel: AdministrativeLevels;
  currentAdministrativeDivision: AdministrativeDivision;
  school: School;
  attendanceListSortOptions: [string, string];
  attendanceType: AttendanceType;
  currentSummaryList: Summary[];
  stateSummaryList: AdministrativeDivisionSummary[];
  municipalitySummaryList: AdministrativeDivisionSummary[];
  schoolSummaryList: SchoolSummary[];
  schoolDailyReports: SchoolDailyReport[];
  currentSummary: Summary[];
  administrativeDivisionLevel: boolean;
  administrativeDivisionDailyReports: AdministrativeDivisionDailyReport[];
  navigation: NavigationParams[];
}

const wrap = (override: Partial<WrapperOptions> = {}) => {
  const options = {
    printer: stubPrinter(),
    administrativeLevel: AdministrativeLevels.SCHOOL,
    currentAdministrativeDivision: makeAdministrativeDivision({ lastUpdateDate: LocalDate.of('2020-06-17') }),
    school: makeSchool(),
    attendanceListSortOptions: ['name', 'asc'],
    attendanceType: AttendanceType.STUDENT,
    currentSummaryList: [makeSchoolSummary({ id: '2', name: 'test 2' }), makeSchoolSummary({ id: '1', name: 'test 1' })],
    stateSummaryList: [makeAdministrativeDivision({ id: '0', name: 'test 0' }), makeAdministrativeDivision({ id: '1', name: 'test 1' })],
    municipalitySummaryList: [
      makeAdministrativeDivision({ id: '0', name: 'test 0' }),
      makeAdministrativeDivision({ id: '1', name: 'test 1' }),
    ],
    schoolSummaryList: [makeSchoolSummary({ id: '0', name: 'test 0' }), makeSchoolSummary({ id: '1', name: 'test 1' })],
    schoolDailyReports: [],
    currentSummary: makeSchoolSummary({ id: '0', name: 'test 0' }),
    administrativeDivisionLevel: false,
    administrativeDivisionDailyReports: [],
    navigation: [],
    ...override,
  };
  wrapper = shallowMount<TemplateWebComponent>(TemplateWebVue, {
    propsData: {
      administrativeLevel: options.administrativeLevel,
      currentAdministrativeDivision: options.currentAdministrativeDivision,
      school: options.school,
      attendanceListSortOptions: options.attendanceListSortOptions,
      attendanceType: options.attendanceType,
      currentSummaryList: options.currentSummaryList,
      stateSummaryList: options.stateSummaryList,
      municipalitySummaryList: options.municipalitySummaryList,
      schoolSummaryList: options.schoolSummaryList,
      schoolDailyReports: options.schoolDailyReports,
      currentSummary: options.currentSummary,
      administrativeDivisionLevel: options.administrativeDivisionLevel,
      administrativeDivisionDailyReports: options.administrativeDivisionDailyReports,
      navigation: [],
    },
  });
  component = wrapper.vm;
};

describe('TemplatePrint', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should be the school last update date', () => {
    wrap();
    expect(component.lastUpdateDate).toBe('Información correspondiente al 16/06/2020');
  });

  it('should be the administrative division last update date', () => {
    wrap({ administrativeLevel: AdministrativeLevels.COUNTRY });
    expect(component.lastUpdateDate).toBe('Información correspondiente al 17/06/2020');
  });

  it('should not be a last update date', () => {
    wrap({ school: undefined });
    expect(component.lastUpdateDate).toBe('');
  });
});
