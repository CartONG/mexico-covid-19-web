import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { CountryRepository } from '@/domain/country/CountryRepository';
import { Logger } from '@/domain/Logger';
import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { StateRepository } from '@/domain/state/StateRepository';
import { AppStore } from '@/primary/app/AppStore';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { ComponentState } from '@/primary/ComponentState';
import { MainVue } from '@/primary/main';
import { SidebarVue } from '@/primary/sidebar';

@Component({
  components: { ChoroplethMapVue, SidebarVue, MainVue },
})
export default class Dashboard extends Vue {
  state = ComponentState.PENDING;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private countryRepository!: () => CountryRepository;

  @Inject()
  private stateRepository!: () => StateRepository;

  @Inject()
  private municipalityRepository!: () => MunicipalityRepository;

  @Inject()
  private schoolRepository!: () => SchoolRepository;

  @Inject()
  private appStore!: () => AppStore;

  get stateSelection() {
    return this.appStore().getStateSelection();
  }

  get municipalitySelection() {
    return this.appStore().getMunicipalitySelection();
  }

  get schoolSelection() {
    return this.appStore().getSchoolSelection();
  }

  @Watch('stateSelection.stateId')
  stateIdWatcher(stateId: string) {
    if (stateId !== '') {
      setTimeout(() => {
        this.findState(stateId);
      }, 1000);
    } else {
      this.appStore().saveState(undefined);
    }
  }

  @Watch('municipalitySelection.municipalityId')
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

  @Watch('schoolSelection.schoolId')
  schoolIdWatcher(schoolId: string) {
    if (schoolId) {
      this.findSchool(schoolId);
    }
  }

  created(): void {
    Promise.all([this.countryRepository().get(), this.stateRepository().list(), this.municipalityRepository().list()])
      .then(results => {
        this.appStore().saveCountry(results[0]);
        this.appStore().saveStateSummaryList(results[1]);
        this.appStore().saveMunicipalitySummaryList(results[2] as MunicipalitySummary[]);
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
    this.stateRepository()
      .find(stateId)
      .then(state => {
        this.appStore().saveState(state);
      })
      .catch(error => {
        this.appStore().saveState(undefined);
        this.logger().error('Fail to retrieve state', error);
      });
  }

  private findMunicipality(municipalityId: string) {
    this.municipalityRepository()
      .find(municipalityId)
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
      .then(school => {})
      .catch(error => {
        this.logger().error('Fail to retrieve school', error);
      });
  }
}
