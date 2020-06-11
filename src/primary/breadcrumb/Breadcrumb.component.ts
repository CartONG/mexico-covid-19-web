import { Component, Inject, Vue } from 'vue-property-decorator';

import { SelectionSource } from '@/domain/selection/SelectionSource';
import { SelectionType } from '@/domain/selection/SelectionType';
import { AppStore } from '@/primary/app/AppStore';

@Component
export default class Breadcrumb extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get selection() {
    return this.appStore().getSelection();
  }

  private select(level: 'country' | 'state' | 'municipality') {
    if (this.selection) {
      switch (level) {
        case 'country':
          this.appStore().select(null);
          break;
        case 'state':
          this.appStore().select({
            ...this.selection,
            source: SelectionSource.BREADCRUMB,
            type: SelectionType.STATE,
            municipalityId: '',
            schoolId: '',
          });
          break;
        case 'municipality':
          this.appStore().select({
            ...this.selection,
            source: SelectionSource.BREADCRUMB,
            type: SelectionType.MUNICIPALITY,
            schoolId: '',
          });
          break;
      }
    }
  }
}
