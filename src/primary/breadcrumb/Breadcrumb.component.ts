import { Component, Inject, Vue } from 'vue-property-decorator';

import { SelectionSource } from '@/domain/selection/SelectionSource';
import { AppStore } from '@/primary/app/AppStore';

@Component
export default class Breadcrumb extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get navigation() {
    return this.appStore().getNavigation();
  }

  selectCountry() {
    this.appStore().selectCountry(SelectionSource.BREADCRUMB);
  }

  selectState(stateId: string) {
    this.appStore().selectState(stateId, SelectionSource.BREADCRUMB);
  }

  selectMunicipality(municipalityId: string) {
    this.appStore().selectMunicipality(municipalityId, SelectionSource.BREADCRUMB);
  }
}
