import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionRepository } from '@/domain/administrative-division/AdministrativeDivisionRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { Logger } from '@/domain/Logger';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { AbsenceReasonsDetailsVue } from '@/primary/absence-reasons-details';
import { AdministrativeDivisionDetailsVue } from '@/primary/administrative-division-details';
import { AdministrativeDivisionIndicatorsVue } from '@/primary/administrative-division-indicators';
import { AppStore } from '@/primary/app/AppStore';
import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { ComponentState } from '@/primary/ComponentState';
import { DropdownVue } from '@/primary/dropdown';
import { HistoricVue } from '@/primary/historic';
import { InfoModalVue } from '@/primary/info-modal';
import { RateListVue } from '@/primary/rate-list';
import { SchoolDetailsVue } from '@/primary/school-details';
import { SchoolIndicatorsVue } from '@/primary/school-indicators';

@Component({
  components: {
    BreadcrumbVue,
    InfoModalVue,
    ChoroplethMapVue,
    AdministrativeDivisionIndicatorsVue,
    SchoolIndicatorsVue,
    RateListVue,
    AbsenceReasonsDetailsVue,
    AdministrativeDivisionDetailsVue,
    SchoolDetailsVue,
    HistoricVue,
    DropdownVue,
  },
})
export default class Dashboard extends Vue {
  state = ComponentState.PENDING;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private administrativeDivisionRepository!: () => AdministrativeDivisionRepository;

  @Inject()
  private schoolRepository!: () => SchoolRepository;

  @Inject()
  private appStore!: () => AppStore;

  get navigation() {
    return this.appStore().getNavigation();
  }

  get administrativeDivision() {
    return this.navigation.schoolId === '';
  }

  @Watch('navigation.stateId')
  stateIdWatcher(stateId: string) {
    if (stateId !== '') {
      setTimeout(() => {
        this.findState(stateId);
      }, 1000);
    } else {
      this.appStore().saveState(undefined);
    }
  }

  @Watch('navigation.municipalityId')
  municipalityIdWatcher(municipalityId: string) {
    if (municipalityId === '') {
      this.appStore().saveSchoolSummaryList([]);
    } else {
      setTimeout(() => {
        this.listSchool(municipalityId);
        this.findMunicipality(municipalityId);
      }, 1000);
    }
  }

  @Watch('navigation.schoolId')
  schoolIdWatcher(schoolId: string) {
    if (schoolId) {
      this.findSchool(schoolId);
    }
  }

  created(): void {
    Promise.all([
      this.administrativeDivisionRepository().find(AdministrativeDivisionTypes.COUNTRY, ''),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.STATE),
      this.administrativeDivisionRepository().list(AdministrativeDivisionTypes.MUNICIPALITY),
    ])
      .then(results => {
        this.appStore().saveCountry(results[0]);
        this.appStore().saveStateSummaryList(results[1]);
        this.appStore().saveMunicipalitySummaryList(results[2]);
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve country, state, municipality or school data', error);
    this.state = ComponentState.ERROR;
  }

  private listSchool(municipalityId: string) {
    this.schoolRepository()
      .list(municipalityId)
      .then(schoolSummaryList => this.appStore().saveSchoolSummaryList(schoolSummaryList))
      .catch(error => {
        this.logger().error('Fail to retrieve school summaries', error);
        this.appStore().saveSchoolSummaryList([]);
      });
  }

  private findState(stateId: string) {
    this.administrativeDivisionRepository()
      .find(AdministrativeDivisionTypes.STATE, stateId)
      .then(state => {
        this.appStore().saveState(state);
      })
      .catch(error => {
        this.appStore().saveState(undefined);
        this.logger().error('Fail to retrieve state', error);
      });
  }

  private findMunicipality(municipalityId: string) {
    this.administrativeDivisionRepository()
      .find(AdministrativeDivisionTypes.MUNICIPALITY, municipalityId)
      .then(municipality => {
        this.appStore().saveMunicipality(municipality);
      })
      .catch(error => {
        this.appStore().saveMunicipality(undefined);
        this.logger().error('Fail to retrieve municipality', error);
      });
  }

  private findSchool(schoolId: string) {
    this.schoolRepository()
      .find(schoolId)
      .then(school => {
        this.appStore().saveSchool(school);
      })
      .catch(error => {
        this.appStore().saveSchool(undefined);
        this.logger().error('Fail to retrieve school', error);
      });
  }
}
