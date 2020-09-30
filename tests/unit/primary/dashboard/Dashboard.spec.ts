import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import {
  dummyPromise,
  flushPromises,
  stubAdministrativeDivisionDailyReportRepository,
  stubAdministrativeDivisionRepository,
  stubAppStore,
  stubAttendanceTypeBus,
  stubAttendanceWebmapping,
  stubDelayer,
  stubFetcher,
  stubLogger,
  stubNavigationBus,
  stubSchoolDailyReportRepository,
  stubSchoolRepository,
  topology,
} from '../../TestUtils';
import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';
import { makeAdministrativeDivisionDailyReport } from '../AdministrativeDivisionDailyReport.fixture';
import { makeSchool } from '../School.fixture';
import { makeSchoolDailyReport } from '../SchoolDailyReport.fixture';
import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AdministrativeDivisionDailyReportRepository } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReportRepository';
import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { NotFound } from '@/domain/NotFound';
import { SchoolDailyReportRepository } from '@/domain/school-daily-report/SchoolDailyReportRepository';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { AppStore } from '@/primary/app/AppStore';
import { appStoreOptions } from '@/primary/app/appStoreOptions';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { ComponentState } from '@/primary/ComponentState';
import { DashboardComponent, DashboardVue } from '@/primary/dashboard';
import { Delayer } from '@/primary/Delayer';
import { HistoricType } from '@/primary/HistoricType';
import { NavigationBus } from '@/primary/navigation/NavigationBus';

let wrapper: Wrapper<DashboardComponent>;
let component: DashboardComponent;
const localVue = createLocalVue();

interface WrapOptions {
  logger: Logger;
  fetcher: Fetcher;
  animationDelayer: Delayer;
  administrativeDivisionRepository: AdministrativeDivisionRepository;
  schoolRepository: SchoolRepository;
  administrativeDivisionDailyReportRepository: AdministrativeDivisionDailyReportRepository;
  schoolDailyReportRepository: SchoolDailyReportRepository;
  navigationBus: NavigationBus;
  attendanceTypeBus: AttendanceTypeBus;
  attendanceWebmapping: AttendanceWebmapping;
  appStore: AppStore;
}

const wrap = (overrides: Partial<WrapOptions> = {}) => {
  const wrapOptions: WrapOptions = {
    logger: stubLogger(),
    fetcher: stubFetcher(),
    animationDelayer: stubDelayer(),
    administrativeDivisionRepository: stubAdministrativeDivisionRepository(),
    schoolRepository: stubSchoolRepository(),
    administrativeDivisionDailyReportRepository: stubAdministrativeDivisionDailyReportRepository(),
    schoolDailyReportRepository: stubSchoolDailyReportRepository(),
    navigationBus: stubNavigationBus(),
    attendanceTypeBus: stubAttendanceTypeBus(),
    attendanceWebmapping: stubAttendanceWebmapping(),
    appStore: stubAppStore(),
    ...overrides,
  };
  wrapper = shallowMount<DashboardComponent>(DashboardVue, {
    provide: {
      logger: () => wrapOptions.logger,
      fetcher: () => wrapOptions.fetcher,
      animationDelayer: () => wrapOptions.animationDelayer,
      administrativeDivisionRepository: () => wrapOptions.administrativeDivisionRepository,
      schoolRepository: () => wrapOptions.schoolRepository,
      administrativeDivisionDailyReportRepository: () => wrapOptions.administrativeDivisionDailyReportRepository,
      schoolDailyReportRepository: () => wrapOptions.schoolDailyReportRepository,
      navigationBus: () => wrapOptions.navigationBus,
      attendanceTypeBus: () => wrapOptions.attendanceTypeBus,
      attendanceWebmapping: () => wrapOptions.attendanceWebmapping,
      appStore: () => wrapOptions.appStore,
    },
  });
  component = wrapper.vm;
};

const wrapOk = async (overrides: Partial<WrapOptions> = {}) => {
  const administrativeDivisionRepository = stubAdministrativeDivisionRepository();
  administrativeDivisionRepository.find.resolves(makeAdministrativeDivision());
  administrativeDivisionRepository.list.resolves([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
  const administrativeDivisionDailyReportRepository = stubAdministrativeDivisionDailyReportRepository();
  administrativeDivisionDailyReportRepository.listForAdministrativeDivision.resolves([
    makeAdministrativeDivisionDailyReport({ date: '2020-06-16' }),
    makeAdministrativeDivisionDailyReport({ date: '2020-06-17' }),
  ]);
  const fetcher = stubFetcher();
  fetcher.fetch.resolves(topology());
  const wrapOptions = {
    administrativeDivisionRepository,
    administrativeDivisionDailyReportRepository,
    fetcher,
    ...overrides,
  };
  await wrap(wrapOptions);
};

describe('Dashboard', () => {
  beforeEach(() => {
    localVue.use(Vuex);
  });

  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should be in pending state by default', () => {
    const administrativeDivisionRepository = stubAdministrativeDivisionRepository();
    administrativeDivisionRepository.find.returns(dummyPromise());
    administrativeDivisionRepository.list.returns(dummyPromise());
    const administrativeDivisionDailyReportRepository = stubAdministrativeDivisionDailyReportRepository();
    administrativeDivisionDailyReportRepository.listForAdministrativeDivision.returns(dummyPromise());
    const fetcher = stubFetcher();
    fetcher.fetch.returns(dummyPromise());
    wrap({ administrativeDivisionRepository, administrativeDivisionDailyReportRepository, fetcher });
    expect(component.componentState).toBe(ComponentState.PENDING);
  });

  it('should be in error state', async next => {
    const administrativeDivisionRepository = stubAdministrativeDivisionRepository();
    const promise = Promise.reject(new NotFound('AdministrativeDivision'));
    administrativeDivisionRepository.find.returns(promise);
    const logger = stubLogger();
    wrap({ administrativeDivisionRepository, logger });
    await flushPromises();
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe('Fail to retrieve country, state, municipality or school data');
      expect(error.message).toContain('AdministrativeDivision');
      expect(component.componentState).toBe(ComponentState.ERROR);
      next();
    });
  });

  it('should retrieve and store data', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ attendanceWebmapping, appStore });
    expect(attendanceWebmapping.setStatesFeatures.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.setMunicipalitiesFeatures.calledOnce).toBeTruthy();
    expect(component.administrativeDivision).toEqual(makeAdministrativeDivision({ id: 'country' }));
    expect(component.stateSummaryList).toEqual([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
    expect(component.municipalitySummaryList).toEqual([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
    expect(component.administrativeDivisionDailyReports).toEqual([
      makeAdministrativeDivisionDailyReport({ date: '2020-06-16' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-06-17' }),
    ]);
    expect(component.currentSummaryList).toEqual([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
    expect(component.currentSummary).toEqual(makeAdministrativeDivision({ id: 'country' }));
    expect(component.historicInterval).toEqual([0, 1]);
    expect(component.componentState).toBe(ComponentState.SUCCESS);
  });

  it('should register to events', async () => {
    const navigationBus = stubNavigationBus();
    const attendanceTypeBus = stubAttendanceTypeBus();
    await wrapOk({ navigationBus, attendanceTypeBus });
    expect(navigationBus.onBackToCountry.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToState.calledOnce).toBeTruthy();
    expect(navigationBus.onBackToState.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToMunicipality.calledOnce).toBeTruthy();
    expect(navigationBus.onBackToMunicipality.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToSchool.calledOnce).toBeTruthy();
    expect(attendanceTypeBus.onSwitchAttendanceType.calledOnce).toBeTruthy();
  });

  it('should go back to country level', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    component.administrativeDivisionLevel = false;
    component.schoolSummaryList = [makeSchoolSummary()];
    component.currentSummaryList = [];
    component.currentSummary = null;
    component.navigation = [{ id: 'test', name: 'test' }];
    component.administrativeLevel = AdministrativeLevels.SCHOOL;
    component.administrativeDivisionDailyReports = [];
    component.administrativeDivision = null;
    component.onBackToCountry();
    setTimeout(() => {
      expect(component.administrativeDivisionLevel).toBe(true);
      expect(component.schoolSummaryList).toEqual([]);
      expect(component.currentSummaryList).toEqual([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
      expect(component.currentSummary).toEqual(makeAdministrativeDivision({ id: 'country' }));
      expect(component.navigation).toEqual([]);
      expect(component.administrativeLevel).toEqual(AdministrativeLevels.COUNTRY);
      expect(component.administrativeDivisionDailyReports).toEqual([
        makeAdministrativeDivisionDailyReport({ date: '2020-06-16' }),
        makeAdministrativeDivisionDailyReport({ date: '2020-06-17' }),
      ]);
      expect(component.administrativeDivision).toEqual(makeAdministrativeDivision({ id: 'country' }));
      next();
    }, 1);
  });

  it('should navigate to state', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addAdministrativeDivision(makeAdministrativeDivision({ id: '0' }), AdministrativeDivisionTypes.STATE);
    appStore.addAdministrativeDivisionHistoric('0', [makeAdministrativeDivisionDailyReport()], AdministrativeDivisionTypes.STATE);
    component.administrativeDivisionLevel = false;
    component.stateSummaryList = [];
    component.municipalitySummaryList = [];
    component.schoolSummaryList = [makeSchoolSummary()];
    component.currentSummary = null;
    component.currentSummaryList = [makeAdministrativeDivision()];
    component.navigation = [];
    component.administrativeLevel = AdministrativeLevels.SCHOOL;
    component.onNavigateToState({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.administrativeDivisionLevel).toBe(true);
      expect(component.schoolSummaryList).toEqual([]);
      expect(component.currentSummary).toEqual(null);
      expect(component.currentSummaryList).toEqual([]);
      expect(component.navigation).toEqual([{ id: '0', name: 'test' }]);
      expect(component.administrativeLevel).toBe(AdministrativeLevels.STATE);
      expect(component.administrativeDivision).toEqual(makeAdministrativeDivision({ id: '0' }));
      expect(component.administrativeDivisionDailyReports).toEqual([makeAdministrativeDivisionDailyReport()]);
      next();
    }, 1);
  });

  it('should set current summary and current summary list when navigate to state', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addAdministrativeDivision(makeAdministrativeDivision({ id: '0' }), AdministrativeDivisionTypes.STATE);
    appStore.addAdministrativeDivisionHistoric('0', [makeAdministrativeDivisionDailyReport()], AdministrativeDivisionTypes.STATE);
    component.stateSummaryList = [makeAdministrativeDivision({ id: '0' })];
    component.municipalitySummaryList = [makeAdministrativeDivision({ id: '10', stateId: '0' })];
    component.onNavigateToState({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.currentSummary).toEqual(makeAdministrativeDivision({ id: '0' }));
      expect(component.currentSummaryList).toEqual([makeAdministrativeDivision({ id: '10', stateId: '0' })]);
      next();
    }, 1);
  });

  it('should navigate to municipality', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addAdministrativeDivision(makeAdministrativeDivision({ id: '0' }), AdministrativeDivisionTypes.MUNICIPALITY);
    appStore.addAdministrativeDivisionHistoric('0', [makeAdministrativeDivisionDailyReport()], AdministrativeDivisionTypes.MUNICIPALITY);
    appStore.addSchoolSummaries('0', [makeSchoolSummary()]);
    component.administrativeDivisionLevel = false;
    component.schoolSummaryList = [makeSchoolSummary()];
    component.municipalitySummaryList = [makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })];
    component.navigation = [{ id: '0', name: 'test' }];
    component.onNavigateToMunicipality({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.administrativeDivisionLevel).toBe(true);
      expect(component.schoolSummaryList).toEqual([makeSchoolSummary()]);
      expect(component.currentSummary).toEqual(makeAdministrativeDivision({ id: '0' }));
      expect(component.navigation).toEqual([
        { id: '0', name: 'test' },
        { id: '0', name: 'test' },
      ]);
      expect(component.administrativeLevel).toBe(AdministrativeLevels.MUNICIPALITY);
      expect(component.administrativeDivision).toEqual(makeAdministrativeDivision({ id: '0' }));
      expect(component.administrativeDivisionDailyReports).toEqual([makeAdministrativeDivisionDailyReport()]);
      expect(component.schoolSummaryList).toEqual([makeSchoolSummary()]);
      expect(component.currentSummaryList).toEqual([makeSchoolSummary()]);
      next();
    }, 1);
  });

  it('should set current summary when navigate to municipality', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addAdministrativeDivision(makeAdministrativeDivision({ id: '0' }), AdministrativeDivisionTypes.MUNICIPALITY);
    appStore.addAdministrativeDivisionHistoric('0', [makeAdministrativeDivisionDailyReport()], AdministrativeDivisionTypes.MUNICIPALITY);
    appStore.addSchoolSummaries('0', [makeSchoolSummary()]);
    component.municipalitySummaryList = [];
    component.onNavigateToMunicipality({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.currentSummary).toBe(null);
      next();
    }, 1);
  });

  it('should go to school', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addSchool(makeSchool({ id: '0' }));
    appStore.addSchoolHistoric('0', [makeSchoolDailyReport()]);
    component.schoolSummaryList = [makeSchoolSummary({ id: '0' }), makeSchoolSummary({ id: '1' })];
    component.administrativeDivisionLevel = false;
    component.navigation = [
      { id: '0', name: 'test' },
      { id: '0', name: 'test' },
    ];
    component.historicType = HistoricType.GIVES_CLASSES;
    component.onGoToSchool({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.administrativeDivisionLevel).toBe(false);
      expect(component.administrativeDivisionDailyReports).toEqual([]);
      expect(component.currentSummary).toEqual(makeSchoolSummary({ id: '0' }));
      expect(component.navigation).toEqual([
        { id: '0', name: 'test' },
        { id: '0', name: 'test' },
        { id: '0', name: 'test' },
      ]);
      expect(component.administrativeLevel).toBe(AdministrativeLevels.SCHOOL);
      expect(component.historicType).toBe(HistoricType.STUDENT_ABSENCE);
      next();
    }, 1);
  });

  it('should set current summary and historic type when go to school', async next => {
    const animationDelayer = new Delayer(window, 0);
    const appStore = new AppStore(new Store(appStoreOptions));
    await wrapOk({ appStore, animationDelayer });
    appStore.addSchool(makeSchool({ id: '0' }));
    appStore.addSchoolHistoric('0', [makeSchoolDailyReport()]);
    component.schoolSummaryList = [];
    component.historicType = HistoricType.STUDENT_ABSENCE;
    component.onGoToSchool({ id: '0', name: 'test' });
    setTimeout(() => {
      expect(component.currentSummary).toBe(null);
      expect(component.historicType).toBe(HistoricType.STUDENT_ABSENCE);
      next();
    }, 1);
  });

  it('should list school', async () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const schoolRepository = stubSchoolRepository();
    schoolRepository.list.resolves([makeSchool({ id: '0' })]);
    await wrapOk({ appStore, schoolRepository });
    await component.listSchool('mun');
    expect(schoolRepository.list.getCall(0).args[0]).toBe('mun');
    expect(component.schoolSummaryList).toEqual([makeSchool({ id: '0' })]);
    expect(component.currentSummaryList).toEqual([makeSchool({ id: '0' })]);
    expect(appStore.getSchoolSummaries('mun')).toEqual([makeSchool({ id: '0' })]);
  });

  it('should fail to list school', async next => {
    const logger = stubLogger();
    const schoolRepository = stubSchoolRepository();
    const promise = Promise.reject(new NotFound('School'));
    schoolRepository.list.returns(promise);
    await wrapOk({ logger, schoolRepository });
    component.schoolSummaryList = [makeSchoolSummary()];
    await component.listSchool('mun');
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe('Fail to retrieve school summaries');
      expect(error.message).toContain('School');
      expect(component.schoolSummaryList).toEqual([]);
      next();
    });
  });

  it('should find school', async () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const schoolRepository = stubSchoolRepository();
    schoolRepository.find.resolves(makeSchool({ id: 'school' }));
    await wrapOk({ schoolRepository, appStore });
    await component.findSchool('school');
    expect(component.school).toEqual(makeSchool({ id: 'school' }));
    expect(appStore.getSchool('school')).toEqual(makeSchool({ id: 'school' }));
  });

  it('should fail to find school', async next => {
    const logger = stubLogger();
    const schoolRepository = stubSchoolRepository();
    const promise = Promise.reject(new NotFound('School'));
    schoolRepository.find.returns(promise);
    await wrapOk({ logger, schoolRepository });
    component.school = makeSchool();
    await component.findSchool('0');
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe('Fail to retrieve school');
      expect(error.message).toContain('School');
      expect(component.school).toBe(null);
      next();
    });
  });

  it('should find administrative division', async () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const administrativeDivisionRepository = stubAdministrativeDivisionRepository();
    administrativeDivisionRepository.find.resolves(makeAdministrativeDivision());
    administrativeDivisionRepository.list.resolves([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
    await wrapOk({ administrativeDivisionRepository, appStore });
    administrativeDivisionRepository.find.resolves(makeAdministrativeDivision({ id: 'state' }));
    component.administrativeDivision = null;
    await component.findAdministrativeDivision('state', AdministrativeDivisionTypes.STATE);
    expect(component.administrativeDivision).toEqual(makeAdministrativeDivision({ id: 'state' }));
    expect(appStore.getAdministrativeDivision('state', AdministrativeDivisionTypes.STATE)).toEqual(
      makeAdministrativeDivision({ id: 'state' })
    );
  });

  it('should fail to find administrative division', async next => {
    const logger = stubLogger();
    const administrativeDivisionRepository = stubAdministrativeDivisionRepository();
    administrativeDivisionRepository.find.resolves(makeAdministrativeDivision());
    administrativeDivisionRepository.list.resolves([makeAdministrativeDivision({ id: '0' }), makeAdministrativeDivision({ id: '1' })]);
    await wrapOk({ logger, administrativeDivisionRepository });
    const promise = Promise.reject(new NotFound('AdministrativeDivision'));
    administrativeDivisionRepository.find.returns(promise);
    await component.findAdministrativeDivision('0', AdministrativeDivisionTypes.STATE);
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe(`Fail to retrieve administrative division ${AdministrativeDivisionTypes.STATE} 0`);
      expect(error.message).toContain('AdministrativeDivision');
      next();
    });
  });

  it('should list administrative division daily reports', async () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const administrativeDivisionDailyReportRepository = stubAdministrativeDivisionDailyReportRepository();
    administrativeDivisionDailyReportRepository.listForAdministrativeDivision.resolves([
      makeAdministrativeDivisionDailyReport({ date: '2020-06-16' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-06-17' }),
    ]);
    await wrapOk({ appStore, administrativeDivisionDailyReportRepository });
    administrativeDivisionDailyReportRepository.listForAdministrativeDivision.resolves([
      makeAdministrativeDivisionDailyReport({ date: '2020-06-18' }),
    ]);
    await component.listAdministrativeDivisionDailyReport(AdministrativeDivisionTypes.STATE, 'state');
    expect(component.administrativeDivisionDailyReports).toEqual([makeAdministrativeDivisionDailyReport({ date: '2020-06-18' })]);
    expect(appStore.getAdministrativeDivisionHistoric('state', AdministrativeDivisionTypes.STATE)).toEqual([
      makeAdministrativeDivisionDailyReport({ date: '2020-06-18' }),
    ]);
  });

  it('should fail to list administrative division daily reports', async next => {
    const logger = stubLogger();
    const administrativeDivisionDailyReportRepository = stubAdministrativeDivisionDailyReportRepository();
    administrativeDivisionDailyReportRepository.listForAdministrativeDivision.resolves([
      makeAdministrativeDivisionDailyReport({ date: '2020-06-16' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-06-17' }),
    ]);
    await wrapOk({ logger, administrativeDivisionDailyReportRepository });
    const promise = Promise.reject(new NotFound('AdministrativeDivisionDailyReport'));
    administrativeDivisionDailyReportRepository.listForAdministrativeDivision.returns(promise);
    await component.listAdministrativeDivisionDailyReport(AdministrativeDivisionTypes.STATE, 'state');
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe(`Fail to retrieve administrative division daily reports (${AdministrativeDivisionTypes.STATE}) state)`);
      expect(error.message).toContain('AdministrativeDivisionDailyReport');
      next();
    });
  });

  it('should list school daily reports', async () => {
    const appStore = new AppStore(new Store(appStoreOptions));
    const schoolDailyReportRepository = stubSchoolDailyReportRepository();
    schoolDailyReportRepository.listForSchool.resolves([makeSchoolDailyReport({ date: '2020-06-18' })]);
    await wrapOk({ appStore, schoolDailyReportRepository });
    await component.listSchoolDailyReport('school');
    expect(component.schoolDailyReports).toEqual([makeSchoolDailyReport({ date: '2020-06-18' })]);
    expect(appStore.getSchoolHistoric('school')).toEqual([makeSchoolDailyReport({ date: '2020-06-18' })]);
  });

  it('should fail to list school daily reports', async next => {
    const logger = stubLogger();
    const schoolDailyReportRepository = stubSchoolDailyReportRepository();
    const promise = Promise.reject(new NotFound('SchoolDailyReport'));
    schoolDailyReportRepository.listForSchool.returns(promise);
    await wrapOk({ logger, schoolDailyReportRepository });
    await component.listSchoolDailyReport('school');
    await promise.catch(() => {
      const [message, error] = logger.error.getCall(0).args;
      expect(message).toBe('Fail to retrieve school daily reports');
      expect(error.message).toContain('SchoolDailyReport');
      next();
    });
  });
});
