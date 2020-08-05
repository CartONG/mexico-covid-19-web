import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { NavigationBus } from '@/primary/navigation/NavigationBus';

@Component
export default class Dropdown extends Vue {
  text: string = '';

  @Inject()
  navigationBus!: () => NavigationBus;

  @Prop({ type: Array, default: [] })
  readonly items!: Summary[];

  @Prop()
  readonly administrativeLevel!: AdministrativeLevels;

  get sortedItems() {
    return this.items.sort((item1, item2) => (item1.name < item2.name ? -1 : 1));
  }

  get filteredItems() {
    return this.sortedItems.filter(item => item.name.toLowerCase().indexOf(this.text.toLowerCase()) >= 0);
  }

  selectItem(item: AdministrativeDivisionSummary | SchoolSummary | null) {
    if (item) {
      switch (this.administrativeLevel) {
        case AdministrativeLevels.COUNTRY:
          this.navigationBus().goToState({ id: item.id, name: item.name });
          break;
        case AdministrativeLevels.STATE:
          this.navigationBus().goToMunicipality({ id: item.id, name: item.name });
          break;
        case AdministrativeLevels.MUNICIPALITY:
        case AdministrativeLevels.SCHOOL:
          this.navigationBus().goToSchool({ id: item.id, name: item.name });
      }
    }
  }
}
