import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { AttendanceCardVue } from '@/primary/choropleth-map/attendance-card';
import { toSummaryDataSet } from '@/primary/common/SummaryDataSet';
import { RateTypes } from '@/primary/RateTypes';

@Component({
  components: { AttendanceCardVue },
})
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
