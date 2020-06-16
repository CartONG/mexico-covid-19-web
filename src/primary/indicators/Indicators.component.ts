import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { IndicatorsDataSet, mergedReportToIndicatorDataSet, toIndicatorDataSet } from '@/primary/indicators/IndicatorsDataSet';

@Component
export default class Indicators extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get level() {
    return this.appStore().getLevel();
  }

  get country() {
    return this.appStore().getCountry();
  }

  get state() {
    return this.appStore().getState();
  }

  get municipality() {
    return this.appStore().getMunicipality();
  }

  get school() {
    return this.appStore().getSchool();
  }

  get indicatorsDataSet(): IndicatorsDataSet {
    switch (this.level) {
      case 'state':
        return mergedReportToIndicatorDataSet(this.state);
      case 'municipality':
        return mergedReportToIndicatorDataSet(this.municipality);
      case 'school':
        return toIndicatorDataSet(this.school);
    }
    return mergedReportToIndicatorDataSet(this.country);
  }
}
