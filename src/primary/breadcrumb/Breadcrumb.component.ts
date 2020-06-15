import { Component, Inject, Vue } from 'vue-property-decorator';

import { SelectionSource } from '@/domain/selection/SelectionSource';
import { AppStore } from '@/primary/app/AppStore';

@Component
export default class Breadcrumb extends Vue {
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

  selectCountry() {
    this.appStore().selectCountry(SelectionSource.BREADCRUMB);
  }

  selectState() {
    this.appStore().selectState(this.stateSelection.stateId, SelectionSource.BREADCRUMB);
  }

  selectMunicipality() {
    this.appStore().selectMunicipality(this.municipalitySelection.municipalityId, SelectionSource.BREADCRUMB);
  }
}
