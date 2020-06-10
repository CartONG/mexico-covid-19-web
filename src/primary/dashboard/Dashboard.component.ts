import { Component, Inject, Vue } from 'vue-property-decorator';

import { Logger } from '@/domain/Logger';
import { MunicipalityRepository } from '@/domain/municipality/MunicipalityRepository';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { StateRepository } from '@/domain/state/StateRepository';
import { AppStore } from '@/primary/app/AppStore';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { ComponentState } from '@/primary/ComponentState';
import { DropdownVue } from '@/primary/dropdown';

@Component({
  components: { ChoroplethMapVue, DropdownVue },
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
  private appStore!: () => AppStore;

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
    this.logger().error('Fail to retrieve state summaries or municipality summaries', error);
    this.state = ComponentState.ERROR;
  }
}
