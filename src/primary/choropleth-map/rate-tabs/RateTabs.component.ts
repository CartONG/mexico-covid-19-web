import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toSummaryDataSet } from '@/primary/choropleth-map/rate-tabs/SummaryDataSet';
import { RateTypes } from '@/primary/RateTypes';

@Component
export default class RateTabs extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get selectedRateType() {
    return this.appStore().getSelectedRateType();
  }

  get currentSummary() {
    return this.appStore().getCurrentSummary();
  }

  get summaryDataSet() {
    return toSummaryDataSet(this.currentSummary);
  }

  selectRateType(rateType: RateTypes) {
    this.appStore().selectRateType(rateType);
  }
}
