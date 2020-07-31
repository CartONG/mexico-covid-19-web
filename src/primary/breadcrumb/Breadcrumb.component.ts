import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { toBreadcrumbDataSet } from '@/primary/breadcrumb/BreadcrumbDataSet';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

@Component
export default class Breadcrumb extends Vue {
  // navigationParamsList: NavigationParams[] = [];
  // breadcrumbDataSet = toBreadcrumbDataSet();

  @Inject()
  private navigationBus!: () => NavigationBus;

  @Prop()
  readonly navigation!: NavigationParams[];

  get breadcrumbDataSet() {
    return toBreadcrumbDataSet(this.navigation);
  }

  created() {
    // this.navigationBus().onGoToState(this.onGoToState);
    // this.navigationBus().onGoToMunicipality(this.onGoToMunicipality);
    // this.navigationBus().onGoToSchool(this.onGoToSchool);
  }

  backToCountry() {
    // this.navigationParamsList = [];
    // this.breadcrumbDataSet = toBreadcrumbDataSet();
    this.navigationBus().backToCountry();
  }

  backToState(navigationParams: NavigationParams) {
    // this.navigationParamsList = [this.navigationParamsList[0]];
    // this.breadcrumbDataSet = toBreadcrumbDataSet(navigationParams);
    this.navigationBus().backToState(navigationParams);
  }

  backToMunicipality(navigationParams: NavigationParams) {
    // this.navigationParamsList = [this.navigationParamsList[0], this.navigationParamsList[1]];
    // this.breadcrumbDataSet = toBreadcrumbDataSet(this.navigationParamsList[0], navigationParams);
    this.navigationBus().backToMunicipality(navigationParams);
  }

  /*
  onGoToState(navigationParams: NavigationParams) {
    this.navigationParamsList = [navigationParams];
    this.breadcrumbDataSet = toBreadcrumbDataSet(navigationParams);
  }

  onGoToMunicipality(navigationParams: NavigationParams) {
    this.navigationParamsList.push(navigationParams);
    this.breadcrumbDataSet = toBreadcrumbDataSet(this.navigationParamsList[0], navigationParams);
  }

  onGoToSchool(navigationParams: NavigationParams) {
    this.navigationParamsList.push(navigationParams);
    this.breadcrumbDataSet = toBreadcrumbDataSet(this.navigationParamsList[0], this.navigationParamsList[1], navigationParams);
  }
   */
}
