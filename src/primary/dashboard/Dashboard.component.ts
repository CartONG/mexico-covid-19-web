import { Component, Inject, Vue } from 'vue-property-decorator';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';
import { AdministrativeDivisionHistoryRepository } from '@/domain/administrative-division-history/AdministrativeDivisionHistoryRepository';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { AdministrativeLevel } from '@/domain/AdministrativeLevel';
import { AttendanceType } from '@/domain/AttendanceType';
import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { School } from '@/domain/school/School';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { ComponentState } from '@/primary/ComponentState';
import { Delayer } from '@/primary/Delayer';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { TemplatePrintVue } from '@/primary/templates/template-print';
import { TemplateWebVue } from '@/primary/templates/template-web';

// TODO: navigate only if there is a change in the navigation params
// TODO: setup a cache to avoid to download data that have been already loaded
// TODO: summaryList --> summaries

@Component({
  components: {
    TemplateWebVue,
    TemplatePrintVue,
  },
})
export default class Dashboard extends Vue {
  componentState = ComponentState.PENDING;
  administrativeDivisionLevel = true;
  stateSummaryList: AdministrativeDivisionSummary[] = [];
  municipalitySummaryList: AdministrativeDivisionSummary[] = [];
  schoolSummaryList: SchoolSummary[] = [];
  currentSummaryList: Summary[] = [];
  country: AdministrativeDivision | null = null;
  state: AdministrativeDivision | null = null;
  municipality: AdministrativeDivision | null = null;
  school: School | null = null;
  currentSummary: Summary | null = null;
  currentAdministrativeDivision: AdministrativeDivision | null = null;
  currentHistoryItems: AdministrativeDivisionHistory[] = [];
  navigation: NavigationParams[] = [];
  attendanceType: AttendanceType = AttendanceType.STUDENT;
  administrativeLevel: AdministrativeLevel = AdministrativeLevel.COUNTRY;
  attendanceListSortOptions: [string, string] = ['name', 'asc'];
  absenceDetailsAttendanceType = AttendanceType.STUDENT;
  isPrinting = false;

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
  private administrativeDivisionHistoryRepository!: () => AdministrativeDivisionHistoryRepository;

  @Inject()
  private navigationBus!: () => NavigationBus;

  @Inject()
  private attendanceTypeBus!: () => AttendanceTypeBus;

  @Inject()
  private attendanceWebmapping!: () => AttendanceWebmapping;

  created(): void {
    this.navigationBus().onBackToCountry(this.onBackToCountry);
    this.navigationBus().onGoToState(this.onGoToState);
    this.navigationBus().onBackToState(this.onBackToState);
    this.navigationBus().onGoToMunicipality(this.onGoToMunicipality);
    this.navigationBus().onBackToMunicipality(this.onBackToMunicipality);
    this.navigationBus().onGoToSchool(this.onGoToSchool);
    this.attendanceTypeBus().onSwitchAttendanceType(attendanceType => (this.attendanceType = attendanceType));

    Promise.all([
      this.administrativeDivisionRepository().find(AdministrativeDivisionTypes.COUNTRY, ''),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.STATE),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.MUNICIPALITY),
      this.administrativeDivisionHistoryRepository().listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, ''),
      this.fetcher().fetch('states.topojson'),
      this.fetcher().fetch('municipalities.topojson'),
    ])
      .then(results => {
        this.attendanceWebmapping().setStatesFeatures(results[4], results[1]);
        this.attendanceWebmapping().setMunicipalitiesFeatures(results[5], results[2]);
        this.country = results[0];
        this.currentAdministrativeDivision = this.country;
        this.stateSummaryList = results[1];
        this.municipalitySummaryList = results[2];
        this.currentHistoryItems = results[3];
        this.currentSummaryList = this.stateSummaryList;
        this.currentSummary = this.country;
        this.componentState = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve country, state, municipality or school data', error);
    this.componentState = ComponentState.ERROR;
  }

  private listSchool(municipalityId: string) {
    this.schoolRepository()
      .list(municipalityId)
      .then(schoolSummaryList => {
        this.schoolSummaryList = schoolSummaryList;
        this.currentSummaryList = schoolSummaryList;
      })
      .catch(error => {
        this.logger().error('Fail to retrieve school summaries', error);
        this.schoolSummaryList = [];
      });
  }

  private findState(stateId: string) {
    this.administrativeDivisionRepository()
      .find(AdministrativeDivisionTypes.STATE, stateId)
      .then(state => {
        this.state = state;
        this.currentAdministrativeDivision = this.state;
      })
      .catch(error => {
        this.state = null;
        this.logger().error('Fail to retrieve state', error);
      });
  }

  private findMunicipality(municipalityId: string) {
    this.administrativeDivisionRepository()
      .find(AdministrativeDivisionTypes.MUNICIPALITY, municipalityId)
      .then(municipality => {
        this.municipality = municipality;
        this.currentAdministrativeDivision = this.municipality;
      })
      .catch(error => {
        this.municipality = null;
        this.logger().error('Fail to retrieve municipality', error);
      });
  }

  private findSchool(schoolId: string) {
    this.schoolRepository()
      .find(schoolId)
      .then(school => (this.school = school))
      .catch(error => {
        this.school = null;
        this.logger().error('Fail to retrieve school', error);
      });
  }

  onBackToCountry() {
    this.administrativeDivisionLevel = true;
    this.schoolSummaryList = [];
    this.currentSummary = this.country;
    this.currentAdministrativeDivision = this.country;
    this.currentSummaryList = this.stateSummaryList;
    this.navigation = [];
    this.administrativeLevel = AdministrativeLevel.COUNTRY;
  }

  onGoToState(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.animationDelayer().afterDelay(() => this.findState(navigationParams.id));
    this.schoolSummaryList = [];
    this.state = null;
    this.currentAdministrativeDivision = null;
    this.currentSummary = this.stateSummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.currentSummaryList = this.municipalitySummaryList.filter(summary => summary.stateId === navigationParams.id);
    this.navigation = [navigationParams];
    this.administrativeLevel = AdministrativeLevel.STATE;
  }

  onBackToState(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.schoolSummaryList = [];
    this.currentAdministrativeDivision = this.state;
    this.currentSummary = this.stateSummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.currentSummaryList = this.municipalitySummaryList.filter(summary => summary.stateId === navigationParams.id);
    this.navigation = [navigationParams];
    this.administrativeLevel = AdministrativeLevel.STATE;
  }

  onGoToMunicipality(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.currentSummaryList = this.schoolSummaryList;
    this.municipality = null;
    this.currentAdministrativeDivision = null;
    this.currentSummary = this.municipalitySummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.animationDelayer().afterDelay(() => {
      this.listSchool(navigationParams.id);
      this.findMunicipality(navigationParams.id);
    });
    this.navigation = [this.navigation[0], navigationParams];
    this.administrativeLevel = AdministrativeLevel.MUNICIPALITY;
  }

  onBackToMunicipality(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = true;
    this.currentAdministrativeDivision = this.municipality;
    this.currentSummary = this.municipalitySummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.navigation = [this.navigation[0], navigationParams];
    this.administrativeLevel = AdministrativeLevel.MUNICIPALITY;
  }

  onGoToSchool(navigationParams: NavigationParams) {
    this.administrativeDivisionLevel = false;
    this.findSchool(navigationParams.id);
    this.school = null;
    this.currentSummary = this.schoolSummaryList.find(summary => summary.id === navigationParams.id) || null;
    this.navigation = [this.navigation[0], this.navigation[1], navigationParams];
    this.administrativeLevel = AdministrativeLevel.SCHOOL;
  }
}
