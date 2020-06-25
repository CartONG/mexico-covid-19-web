import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { AdministrativeDivisionDataset, toAdministrativeDivisionDataset } from '@/primary/details/AdministrativeDivisionDataset';

@Component
export default class Details extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get currentAdministrativeDivision() {
    return this.appStore().getCurrentAdministrativeDivision();
  }

  get administrativeDivisionDataSet(): AdministrativeDivisionDataset {
    return toAdministrativeDivisionDataset(this.currentAdministrativeDivision);
  }
}
