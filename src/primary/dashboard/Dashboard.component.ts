import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivisionDailyReportRepository } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReportRepository';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { SchoolDailyReportRepository } from '@/domain/school-daily-report/SchoolDailyReportRepository';
import { School } from '@/domain/school/School';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { AppStore } from '@/primary/app/AppStore';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ComponentState } from '@/primary/ComponentState';
import { Delayer } from '@/primary/Delayer';
import { DropdownVue } from '@/primary/dropdown';
import { HistoricType } from '@/primary/HistoricType';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { TemplatePrintVue } from '@/primary/templates/template-print';
import { TemplateWebVue } from '@/primary/templates/template-web';

// TODO: summaryList --> summaries

@Component({
  components: {
    TemplateWebVue,
    TemplatePrintVue,
    BreadcrumbVue,
    DropdownVue,
  },
})
export default class Dashboard extends Vue {
  componentState = ComponentState.PENDING;
  administrativeDivisionLevel = true;
  stateSummaryList: AdministrativeDivisionSummary[] = [];
  municipalitySummaryList: AdministrativeDivisionSummary[] = [];
  schoolSummaryList: SchoolSummary[] = [];
  currentSummaryList: Summary[] = [];
  administrativeDivision: AdministrativeDivision | null = null;
  school: School | null = null;
  currentSummary: Summary | null = null;
  administrativeDivisionDailyReports: AdministrativeDivisionDailyReport[] = [];
  schoolDailyReports: SchoolDailyReport[] = [];
  navigation: NavigationParams[] = [];
  attendanceType: AttendanceType = AttendanceType.STUDENT;
  administrativeLevel: AdministrativeLevels = AdministrativeLevels.COUNTRY;
  attendanceListSortOptions: [string, string] = ['name', 'asc'];
  absenceDetailsAttendanceType = AttendanceType.STUDENT;
  historicType = HistoricType.GIVES_CLASSES;
  historicInterval: [number, number] = [0, 0];
  isPrinting = false;
  mapExtent: [number, number, number, number] | null = null;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private fetcher!: () => Fetcher;

  @Inject()
  private animationDelayer!: () => Delayer;

  @Inject()
  private administrativeDivisionRepository!: () => AdministrativeDivisionRepository;

  @Inject()
  private schoolRepository!: () => SchoolRepository;

  @Inject()
  private administrativeDivisionDailyReportRepository!: () => AdministrativeDivisionDailyReportRepository;

  @Inject()
  private schoolDailyReportRepository!: () => SchoolDailyReportRepository;

  @Inject()
  private navigationBus!: () => NavigationBus;

  @Inject()
  private attendanceTypeBus!: () => AttendanceTypeBus;

  @Inject()
  private attendanceWebmapping!: () => AttendanceWebmapping;

  @Inject()
  private appStore!: () => AppStore;

  created(): void {
    this.navigationBus().onBackToCountry(this.onBackToCountry);
    this.navigationBus().onGoToState(this.onNavigateToState);
    this.navigationBus().onBackToState(this.onNavigateToState);
    this.navigationBus().onGoToMunicipality(this.onNavigateToMunicipality);
    this.navigationBus().onBackToMunicipality(this.onNavigateToMunicipality);
    this.navigationBus().onGoToSchool(this.onGoToSchool);
    this.attendanceTypeBus().onSwitchAttendanceType(attendanceType => (this.attendanceType = attendanceType));

    Promise.all([
      this.administrativeDivisionRepository().find(AdministrativeDivisionTypes.COUNTRY, ''),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.STATE),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.MUNICIPALITY),
      this.administrativeDivisionDailyReportRepository().listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, ''),
      this.fetcher().fetch('states.topojson'),
      this.fetcher().fetch('municipalities.topojson'),
    ])
      .then(results => {
        this.attendanceWebmapping().setStatesFeatures(results[4], results[1]);
        this.attendanceWebmapping().setMunicipalitiesFeatures(results[5], results[2]);
        this.appStore().addAdministrativeDivision({ ...results[0], id: 'country' }, AdministrativeDivisionTypes.COUNTRY);
        this.administrativeDivision = this.appStore().getAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY);
        this.stateSummaryList = results[1];
        this.municipalitySummaryList = results[2];
        this.administrativeDivisionDailyReports = results[3];
        this.appStore().addAdministrativeDivisionHistoric('country', results[3], AdministrativeDivisionTypes.COUNTRY);
        this.currentSummaryList = this.stateSummaryList;
        this.currentSummary = this.appStore().getAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY);
        const start = this.administrativeDivisionDailyReports.length - 15 < 0 ? 0 : this.administrativeDivisionDailyReports.length - 15;
        this.historicInterval = [start, this.administrativeDivisionDailyReports.length - 1];
        this.componentState = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve country, state, municipality or school data', error);
    this.componentState = ComponentState.ERROR;
  }

  private listSchool(municipalityId: string) {
    const summaries = this.appStore().getSchoolSummaries(municipalityId);

    if (summaries) {
      this.setSchoolSummaries(municipalityId, summaries, true);
    } else {
      this.schoolRepository()
        .list(municipalityId)
        .then(summaries => this.setSchoolSummaries(municipalityId, summaries))
        .catch(this.listSchoolError);
    }
  }

  private listSchoolError(error: Error) {
    this.logger().error('Fail to retrieve school summaries', error);
    this.schoolSummaryList = [];
  }

  private setSchoolSummaries(municipalityId: string, summaries: SchoolSummary[], updateStore = true) {
    this.schoolSummaryList = summaries;
    this.currentSummaryList = summaries;

    if (updateStore) {
      this.appStore().addSchoolSummaries(municipalityId, summaries);
    }
  }

  private findAdministrativeDivision(administrativeDivisionId: string, administrativeDivisionType: AdministrativeDivisionTypes) {
    const administrativeDivision = this.appStore().getAdministrativeDivision(administrativeDivisionId, administrativeDivisionType);

    if (administrativeDivision) {
      this.administrativeDivision = administrativeDivision;
    } else {
      this.administrativeDivision = null;
      this.administrativeDivisionRepository()
        .find(administrativeDivisionType, administrativeDivisionId)
        .then(administrativeDivision => {
          this.appStore().addAdministrativeDivision(administrativeDivision, administrativeDivisionType);
          this.administrativeDivision = administrativeDivision;
        })
        .catch(error => {
          this.logger().error(`Fail to retrieve administrative division ${administrativeDivisionType} ${administrativeDivisionId}`, error);
        });
    }
  }

  private findSchool(schoolId: string) {
    const school = this.appStore().getSchool(schoolId);

    if (school) {
      this.school = school;
    } else {
      this.school = null;
      this.schoolRepository()
        .find(schoolId)
        .then(school => {
          this.appStore().addSchool(school);
          this.school = school;
        })
        .catch(error => {
          this.school = null;
          this.logger().error('Fail to retrieve school', error);
        });
    }
  }

  private listAdministrativeDivisionDailyReport(administrativeDivisionType: AdministrativeDivisionTypes, id: string) {
    const administrativeDivisionDailyReports = this.appStore().getAdministrativeDivisionHistoric(id, administrativeDivisionType);

    if (administrativeDivisionDailyReports) {
      this.administrativeDivisionDailyReports = administrativeDivisionDailyReports;
    } else {
      this.administrativeDivisionDailyReports = [];
      this.administrativeDivisionDailyReportRepository()
        .listForAdministrativeDivision(administrativeDivisionType, id)
        .then(administrativeDivisionDailyReports => {
          this.appStore().addAdministrativeDivisionHistoric(id, administrativeDivisionDailyReports, administrativeDivisionType);
          this.administrativeDivisionDailyReports = administrativeDivisionDailyReports;
        })
        .catch(error => {
          this.logger().error(`Fail to retrieve administrative division daily reports (${administrativeDivisionType}) ${id})`, error);
        });
    }
  }

  private listSchoolDailyReport(id: string) {
    const schoolDailyReports = this.appStore().getSchoolHistoric(id);

    if (schoolDailyReports) {
      this.schoolDailyReports = schoolDailyReports;
    } else {
      this.schoolDailyReports = [];
      this.schoolDailyReportRepository()
        .listForSchool(id)
        .then(schoolDailyReports => {
          this.appStore().addSchoolHistoric(id, schoolDailyReports);
          this.schoolDailyReports = schoolDailyReports;
        })
        .catch(error => {
          this.logger().error('Fail to retrieve school daily reports', error);
        });
    }
  }

  onBackToCountry() {
    this.administrativeDivisionLevel = true;
    this.animationDelayer().afterDelay(() => {
      this.listAdministrativeDivisionDailyReport(AdministrativeDivisionTypes.COUNTRY, 'country');
      this.findAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY);
    });
    this.schoolSummaryList = [];
    this.currentSummaryList = this.stateSummaryList;
    this.currentSummary = this.appStore().getAdministrativeDivision('country', AdministrativeDivisionTypes.COUNTRY);
    this.navigation = [];
    this.administrativeLevel = AdministrativeLevels.COUNTRY;
  }

  onNavigateToState(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.animationDelayer().afterDelay(() => {
      this.findAdministrativeDivision(navigationParams.id, AdministrativeDivisionTypes.STATE);
      this.listAdministrativeDivisionDailyReport(AdministrativeDivisionTypes.STATE, navigationParams.id);
    });
    this.schoolSummaryList = [];
    this.currentSummary = this.stateSummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.currentSummaryList = this.municipalitySummaryList.filter(summary => summary.stateId === navigationParams.id);
    this.navigation = [navigationParams];
    this.administrativeLevel = AdministrativeLevels.STATE;
  }

  onNavigateToMunicipality(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.animationDelayer().afterDelay(() => {
      this.listAdministrativeDivisionDailyReport(AdministrativeDivisionTypes.MUNICIPALITY, navigationParams.id);
      this.listSchool(navigationParams.id);
      this.findAdministrativeDivision(navigationParams.id, AdministrativeDivisionTypes.MUNICIPALITY);
    });
    this.currentSummaryList = this.schoolSummaryList;
    this.currentSummary = this.municipalitySummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.navigation = [this.navigation[0], navigationParams];
    this.administrativeLevel = AdministrativeLevels.MUNICIPALITY;
  }

  onGoToSchool(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = false;
    this.administrativeDivisionDailyReports = [];
    this.findSchool(navigationParams.id);
    this.listSchoolDailyReport(navigationParams.id);
    this.currentSummary = this.schoolSummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.navigation = [this.navigation[0], this.navigation[1], navigationParams];
    this.administrativeLevel = AdministrativeLevels.SCHOOL;
    this.historicType = this.historicType === HistoricType.GIVES_CLASSES ? HistoricType.STUDENT_ABSENCE : this.historicType;
  }
}
