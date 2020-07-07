import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

@Component
export default class AdministrativeDivisionDetails extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get administrativeDivisionDataSet() {
    return toAdministrativeDivisionDataset(this.appStore().getCurrentAdministrativeDivision());
  }
}
