import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { AdministrativeDivisionDataSet, toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

@Component
export default class Details extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get currentAdministrativeDivision() {
    return this.appStore().getCurrentAdministrativeDivision();
  }

  get administrativeDivisionDataSet(): AdministrativeDivisionDataSet {
    return toAdministrativeDivisionDataset(this.currentAdministrativeDivision);
  }
}
