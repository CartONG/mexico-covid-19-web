import sinon, { SinonStub } from 'sinon';

import { AxiosError, AxiosInstance } from 'axios';

import { AdministrativeDivisionDailyReportRepository } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReportRepository';
import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { SchoolDailyReportRepository } from '@/domain/school-daily-report/SchoolDailyReportRepository';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { AppStore } from '@/primary/app/AppStore';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { CsvParser } from '@/primary/CsvParser';
import { Delayer } from '@/primary/Delayer';
import { FileDownloader } from '@/primary/FileDownloader';
import { HistoricChart } from '@/primary/HistoricChart';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { Printer } from '@/secondary/Printer';

export interface LoggerStub extends Logger {
  error: SinonStub;
}

export const stubLogger = () =>
  ({
    error: sinon.stub(),
  } as LoggerStub);

export interface FetcherStub extends Fetcher {
  fetch: SinonStub;
}

export const stubFetcher = () => ({
  fetch: sinon.stub(),
});

export interface DelayerStub extends Delayer {
  afterDelay: SinonStub;
}

export const stubDelayer = () =>
  ({
    afterDelay: sinon.stub(),
  } as DelayerStub);

export interface AdministrativeDivisionRepositoryStub extends AdministrativeDivisionRepository {
  list: SinonStub;
  find: SinonStub;
}

export const stubAdministrativeDivisionRepository = (
  options: Partial<AdministrativeDivisionRepositoryStub> = {}
): AdministrativeDivisionRepositoryStub => ({
  list: sinon.stub(),
  find: sinon.stub(),
  ...options,
});

export interface SchoolRepositoryStub extends SchoolRepository {
  list: SinonStub;
  find: SinonStub;
}

export const stubSchoolRepository = (options: Partial<SchoolRepositoryStub> = {}): SchoolRepositoryStub => ({
  list: sinon.stub(),
  find: sinon.stub(),
  ...options,
});

export interface AdministrativeDivisionDailyReportRepositoryStub extends AdministrativeDivisionDailyReportRepository {
  listForAdministrativeDivision: SinonStub;
}

export const stubAdministrativeDivisionDailyReportRepository = (
  options: Partial<AdministrativeDivisionDailyReportRepositoryStub> = {}
): AdministrativeDivisionDailyReportRepositoryStub => ({
  listForAdministrativeDivision: sinon.stub(),
  ...options,
});

export interface SchoolDailyReportRepositoryStub extends SchoolDailyReportRepository {
  listForSchool: SinonStub;
}

export const stubSchoolDailyReportRepository = (
  options: Partial<SchoolDailyReportRepositoryStub> = {}
): SchoolDailyReportRepositoryStub => ({
  listForSchool: sinon.stub(),
  ...options,
});

export interface NavigationBusStub extends NavigationBus {
  backToCountry: SinonStub;
  backToState: SinonStub;
  backToMunicipality: SinonStub;
  goToState: SinonStub;
  goToMunicipality: SinonStub;
  goToSchool: SinonStub;
  onBackToCountry: SinonStub;
  onBackToState: SinonStub;
  onBackToMunicipality: SinonStub;
  onGoToState: SinonStub;
  onGoToMunicipality: SinonStub;
  onGoToSchool: SinonStub;
  destroy: SinonStub;
}

export const stubNavigationBus = (options: Partial<NavigationBusStub> = {}): NavigationBusStub =>
  ({
    backToCountry: sinon.stub(),
    backToState: sinon.stub(),
    backToMunicipality: sinon.stub(),
    goToState: sinon.stub(),
    goToMunicipality: sinon.stub(),
    goToSchool: sinon.stub(),
    onBackToCountry: sinon.stub(),
    onBackToState: sinon.stub(),
    onBackToMunicipality: sinon.stub(),
    onGoToState: sinon.stub(),
    onGoToMunicipality: sinon.stub(),
    onGoToSchool: sinon.stub(),
    destroy: sinon.stub(),
    ...options,
  } as NavigationBusStub);

export interface AttendanceTypeBusStub extends AttendanceTypeBus {
  switchAttendanceType: SinonStub;
  onSwitchAttendanceType: SinonStub;
}

export const stubAttendanceTypeBus = (options: Partial<AttendanceTypeBusStub> = {}): AttendanceTypeBusStub =>
  ({
    switchAttendanceType: sinon.stub(),
    onSwitchAttendanceType: sinon.stub(),
  } as AttendanceTypeBusStub);

export interface AttendanceWebmappingStub extends AttendanceWebmapping {
  setMapTarget: SinonStub;
  onSelectState: SinonStub;
  onSelectMunicipality: SinonStub;
  onSelectSchoolCluster: SinonStub;
  onSelectSchool: SinonStub;
  setPopupElement: SinonStub;
  addControls: SinonStub;
  removeControls: SinonStub;
  setStatesFeatures: SinonStub;
  setMunicipalitiesFeatures: SinonStub;
  setSchoolsFeatures: SinonStub;
  fitToCountry: SinonStub;
  fitToState: SinonStub;
  fitToMunicipality: SinonStub;
  fitToSchool: SinonStub;
  updateMapSize: SinonStub;
  setMinZoomToCurrentZoom: SinonStub;
  closePopup: SinonStub;
  switchAttendanceType: SinonStub;
  adjust: SinonStub;
  getExtent: SinonStub;
}

export const stubAttendanceWebmapping = (options: Partial<AttendanceWebmappingStub> = {}): AttendanceWebmappingStub =>
  ({
    setMapTarget: sinon.stub(),
    onSelectState: sinon.stub(),
    onSelectMunicipality: sinon.stub(),
    onSelectSchoolCluster: sinon.stub(),
    onSelectSchool: sinon.stub(),
    setPopupElement: sinon.stub(),
    addControls: sinon.stub(),
    removeControls: sinon.stub(),
    setStatesFeatures: sinon.stub(),
    setMunicipalitiesFeatures: sinon.stub(),
    setSchoolsFeatures: sinon.stub(),
    fitToCountry: sinon.stub(),
    fitToState: sinon.stub(),
    fitToMunicipality: sinon.stub(),
    fitToSchool: sinon.stub(),
    updateMapSize: sinon.stub(),
    setMinZoomToCurrentZoom: sinon.stub(),
    closePopup: sinon.stub(),
    switchAttendanceType: sinon.stub(),
    adjust: sinon.stub(),
    getExtent: sinon.stub(),
  } as AttendanceWebmappingStub);

export interface AppStoreStub extends AppStore {
  addAdministrativeDivision: SinonStub;
  addAdministrativeDivisionHistoric: SinonStub;
  getAdministrativeDivision: SinonStub;
  getAdministrativeDivisionHistoric: SinonStub;
  addSchool: SinonStub;
  addSchoolHistoric: SinonStub;
  getSchool: SinonStub;
  getSchoolHistoric: SinonStub;
  addSchoolSummaries: SinonStub;
  getSchoolSummaries: SinonStub;
}

export const stubAppStore = (options: Partial<AppStoreStub> = {}): AppStoreStub =>
  ({
    addAdministrativeDivision: sinon.stub(),
    addAdministrativeDivisionHistoric: sinon.stub(),
    getAdministrativeDivision: sinon.stub(),
    getAdministrativeDivisionHistoric: sinon.stub(),
    addSchool: sinon.stub(),
    addSchoolHistoric: sinon.stub(),
    getSchool: sinon.stub(),
    getSchoolHistoric: sinon.stub(),
    addSchoolSummaries: sinon.stub(),
    getSchoolSummaries: sinon.stub(),
  } as AppStoreStub);

export interface AxiosInstanceStub extends AxiosInstance {
  get: SinonStub;
  put: SinonStub;
  post: SinonStub;
  delete: SinonStub;
}

export interface HistoricChartStub extends HistoricChart {
  makeStackedBarChart: SinonStub;
  updateStackedChart: SinonStub;
  transformStackedBarChartToImage: SinonStub;
}

export const stubHistoricChart = (): HistoricChartStub =>
  ({
    makeStackedBarChart: sinon.stub(),
    updateStackedChart: sinon.stub(),
    transformStackedBarChartToImage: sinon.stub(),
  } as HistoricChartStub);

export interface CsvParserStub extends CsvParser {
  toCsvString: SinonStub;
}

export const stubCsvParser = (): CsvParser => ({
  toCsvString: sinon.stub(),
});

export interface FileDownloaderStub extends FileDownloader {
  download: SinonStub;
}

export const stubFileDownloader = (): FileDownloaderStub =>
  ({
    download: sinon.stub(),
  } as FileDownloaderStub);

export interface PrinterStub extends Printer {
  print: SinonStub;
  onBeforePrint: SinonStub;
  onAfterPrint: SinonStub;
  offBeforePrint: SinonStub;
  offAfterPrint: SinonStub;
}

export const stubPrinter = () =>
  ({
    print: sinon.stub(),
    onBeforePrint: sinon.stub(),
    onAfterPrint: sinon.stub(),
    offBeforePrint: sinon.stub(),
    offAfterPrint: sinon.stub(),
  } as PrinterStub);

export const stubAxiosInstance = (): AxiosInstanceStub =>
  ({
    get: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    delete: sinon.stub(),
  } as any);

export const stubAxiosNotFound = (message: string): AxiosError =>
  ({
    status: 404,
    message,
    stack: `NotFound: ${message}`,
  } as any);

interface Catcheable {
  catch: SinonStub;
}

type CatcheableCallable = () => Catcheable;

interface DummyPromise {
  then: SinonStub | CatcheableCallable;
}

export const dummyPromise = (): DummyPromise => {
  const dummy = {
    then: sinon.stub(),
  };
  dummy.then.returns({ catch: sinon.stub() });
  return dummy;
};

export const flushPromises = () => new Promise(setImmediate);

export const topology = (ids: [string, string] = ['0', '1']) => ({
  type: 'Topology',
  objects: {
    'two-squares': {
      type: 'GeometryCollection',
      geometries: [
        { type: 'Polygon', arcs: [[0, 1]], properties: { stateId: '0' }, id: ids[0] },
        { type: 'Polygon', arcs: [[0, 1]], properties: { stateId: '0' }, id: ids[1] },
      ],
    },
  },
  arcs: [
    [
      [1, 2],
      [0, -2],
    ],
    [
      [1, 0],
      [-1, 0],
      [0, 2],
      [1, 0],
    ],
  ],
});
