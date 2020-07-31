import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

@Component
export default class Dropdown extends Vue {
  text: string = '';
  nextSelectionType: 'state' | 'municipality' | 'school' = 'state';

  @Inject()
  navigationBus!: () => NavigationBus;

  @Prop({ type: Array, default: [] })
  readonly items!: Summary[];

  get sortedItems() {
    return this.items.sort((item1, item2) => (item1.name < item2.name ? -1 : 1));
  }

  get filteredItems() {
    return this.sortedItems.filter(item => item.name.toLowerCase().indexOf(this.text.toLowerCase()) >= 0);
  }

  created() {
    this.navigationBus().onBackToCountry(this.onBackToCountry);
    this.navigationBus().onBackToState(this.onNavigateToState);
    this.navigationBus().onGoToState(this.onNavigateToState);
    this.navigationBus().onBackToMunicipality(this.onNavigateToMunicipality);
    this.navigationBus().onGoToMunicipality(this.onNavigateToMunicipality);
  }

  selectItem(item: AdministrativeDivisionSummary | SchoolSummary | null) {
    if (item) {
      switch (this.nextSelectionType) {
        case 'state':
          this.navigationBus().goToState({ id: item.id, name: item.name });
          break;
        case 'municipality':
          this.navigationBus().goToMunicipality({ id: item.id, name: item.name });
          break;
        case 'school':
          this.navigationBus().goToSchool({ id: item.id, name: item.name });
      }
    }
  }

  onBackToCountry() {
    this.nextSelectionType = 'state';
  }

  onNavigateToState(navigationParams: NavigationParams) {
    this.nextSelectionType = 'municipality';
  }

  onNavigateToMunicipality(navigationParams: NavigationParams) {
    this.nextSelectionType = 'school';
  }
}
