import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { IndicatorsDataSet, toIndicatorDataSet } from '@/primary/indicators/IndicatorsDataSet';

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

  get indicatorsDataSet(): IndicatorsDataSet {
    switch (this.level) {
      case 'state':
        return toIndicatorDataSet(this.state);
      case 'municipality':
        return toIndicatorDataSet(this.municipality);
      case 'school':
        return toIndicatorDataSet(undefined);
    }
    return toIndicatorDataSet(this.country);
  }
}
