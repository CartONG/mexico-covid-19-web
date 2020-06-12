import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { Logger } from '@/domain/Logger';
import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { Selection } from '@/domain/selection/Selection';
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
  private stateRepository!: () => StateRepository;

  @Inject()
  private municipalityRepository!: () => MunicipalityRepository;

  @Inject()
  private schoolRepository!: () => SchoolRepository;

  @Inject()
  private appStore!: () => AppStore;

  get selection() {
    return this.appStore().getSelection();
  }

  @Watch('selection')
  selectionWatcher(newValue: Selection, oldValue: Selection) {
    if (this.selection && this.selection.municipalityId !== '' && this.selection.schoolId === '') {
      setTimeout(() => {
        this.schoolRepository()
          .list(this.selection?.municipalityId || '')
          .then(schoolSummaryList => {
            this.appStore().saveSchoolSummaryList(schoolSummaryList);
          })
          .catch(error => {
            this.logger().error('Fail to retrieve school summaries', error);
            this.appStore().saveSchoolSummaryList([]);
          });
      }, 1000);
      return;
    }

    if (oldValue && oldValue.municipalityId !== '' && (!newValue || newValue.municipalityId === '')) {
      this.appStore().saveSchoolSummaryList([]);
    }
  }

  created(): void {
    Promise.all([this.stateRepository().list(), this.municipalityRepository().list()])
      .then(results => {
        this.appStore().saveStateSummaryList(results[0]);
        this.appStore().saveMunicipalitySummaryList(results[1] as MunicipalitySummary[]);
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve state, municipality or school summaries', error);
    this.state = ComponentState.ERROR;
  }
}
