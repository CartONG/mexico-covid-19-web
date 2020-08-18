import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { toBreadcrumbDataSet } from '@/primary/breadcrumb/BreadcrumbDataSet';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

@Component
export default class Breadcrumb extends Vue {
  @Inject()
  private navigationBus!: () => NavigationBus;

  @Prop()
  readonly navigation!: NavigationParams[];

  @Prop({ default: false, type: Boolean })
  readonly printable!: boolean;

  get breadcrumbDataSet() {
    return toBreadcrumbDataSet(this.navigation);
  }

  backToCountry() {
    this.navigationBus().backToCountry();
  }

  backToState(navigationParams: NavigationParams) {
    this.navigationBus().backToState(navigationParams);
  }

  backToMunicipality(navigationParams: NavigationParams) {
    this.navigationBus().backToMunicipality(navigationParams);
  }
}
