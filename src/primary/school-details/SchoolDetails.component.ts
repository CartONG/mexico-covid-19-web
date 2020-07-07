import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class SchoolDetails extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get schoolDataSet() {
    return toSchoolDataSet(this.appStore().getSchool());
  }
}
