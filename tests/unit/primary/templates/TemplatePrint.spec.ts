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
import { TemplatePrintComponent, TemplatePrintVue } from '@/primary/templates/template-print';
import { Printer } from '@/secondary/Printer';

let wrapper: Wrapper<TemplatePrintComponent>;
let component: TemplatePrintComponent;

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
  wrapper = shallowMount<TemplatePrintComponent>(TemplatePrintVue, {
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
    provide: {
      printer: () => options.printer,
    },
  });
  component = wrapper.vm;
};

describe('TemplatePrint', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should dispatch event when printing is over', () => {
    const printer = stubPrinter();
    wrap({ printer });
    component.onAfterPrint();
    expect(printer.onAfterPrint.calledOnce).toBeTruthy();
    expect(wrapper.emitted().endprinting.length).toBe(1);
  });

  it('should unregister to event before destroy', () => {
    const printer = stubPrinter();
    wrap({ printer });
    wrapper.destroy();
    expect(printer.offAfterPrint.calledOnce).toBeTruthy();
  });

  it('should print when map is ready', async () => {
    const printer = stubPrinter();
    wrap({ printer });
    await wrapper.setData({ chartReady: true });
    await wrapper.setData({ mapReady: true });
    expect(printer.print.called).toBeTruthy();
  });

  it('should print when chart is ready', async () => {
    const printer = stubPrinter();
    wrap({ printer });
    await wrapper.setData({ mapReady: true });
    await wrapper.setData({ chartReady: true });
    expect(printer.print.called).toBeTruthy();
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

  it('should be summary chunks', () => {
    wrap({});
    expect(component.currentSummariesChunks).toEqual([
      [makeSchoolSummary({ id: '1', name: 'test 1' }), makeSchoolSummary({ id: '2', name: 'test 2' })],
    ]);
  });

  it('should sort summary chunks by student attendance', () => {
    const currentSummaryList = [
      makeSchoolSummary({ id: '2', studentAttendance: 0.1 }),
      makeSchoolSummary({ id: '1', studentAttendance: 0.8 }),
      makeSchoolSummary({ id: '0', studentAttendance: 0.6 }),
    ];

    wrap({ currentSummaryList, attendanceListSortOptions: ['', 'desc'] });
    expect(component.currentSummariesChunks).toEqual([
      [
        makeSchoolSummary({ id: '1', studentAttendance: 0.8 }),
        makeSchoolSummary({ id: '0', studentAttendance: 0.6 }),
        makeSchoolSummary({ id: '2', studentAttendance: 0.1 }),
      ],
    ]);
  });

  it('should sort summary chunks by teacher attendance', () => {
    const currentSummaryList = [
      makeSchoolSummary({ id: '2', teacherAttendance: 0.1 }),
      makeSchoolSummary({ id: '1', teacherAttendance: 0.8 }),
      makeSchoolSummary({ id: '0', teacherAttendance: 0.6 }),
    ];

    wrap({ currentSummaryList, attendanceListSortOptions: ['', 'asc'], attendanceType: AttendanceType.TEACHER });
    expect(component.currentSummariesChunks).toEqual([
      [
        makeSchoolSummary({ id: '2', teacherAttendance: 0.1 }),
        makeSchoolSummary({ id: '0', teacherAttendance: 0.6 }),
        makeSchoolSummary({ id: '1', teacherAttendance: 0.8 }),
      ],
    ]);
  });

  it('should sort summary chunks by admin attendance', () => {
    const currentSummaryList = [
      makeSchoolSummary({ id: '2', adminAttendance: 0.1 }),
      makeSchoolSummary({ id: '1', adminAttendance: 0.8 }),
      makeSchoolSummary({ id: '0', adminAttendance: 0.6 }),
    ];

    wrap({ currentSummaryList, attendanceListSortOptions: ['', ''], attendanceType: AttendanceType.PERSONAL });
    expect(component.currentSummariesChunks).toEqual([
      [
        makeSchoolSummary({ id: '1', adminAttendance: 0.8 }),
        makeSchoolSummary({ id: '0', adminAttendance: 0.6 }),
        makeSchoolSummary({ id: '2', adminAttendance: 0.1 }),
      ],
    ]);
  });
});
