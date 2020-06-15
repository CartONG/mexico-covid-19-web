import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { StateSummary } from '@/domain/state/StateSummary';
import { AppStore } from '@/primary/app/AppStore';
import { DropdownItem } from '@/primary/dropdown/DropdownItem';

@Component
export default class Dropdown extends Vue {
  text: string = '';
  items: DropdownItem[] = [];
  nextSelectionType: 'state' | 'municipality' | 'school' = 'state';

  @Inject()
  appStore!: () => AppStore;

  @Watch('schoolSummaryList')
  schoolSummaryListWatcher() {
    this.items = this.schoolSummaryList;
  }

  @Watch('stateSelection')
  stateSelectionWatcher() {
    if (this.stateSelection.stateId === '') {
      this.nextSelectionType = 'state';
      this.items = [...this.appStore().getStateSummaryList()];
      return;
    }

    this.nextSelectionType = 'municipality';
    this.items = this.appStore()
      .getMunicipalitySummaryList()
      .filter(municipalitySummary => municipalitySummary.stateId === this.stateSelection.stateId);
  }

  @Watch('municipalitySelection')
  municipalitySelectionWatcher() {
    if (this.municipalitySelection.municipalityId !== '') {
      this.nextSelectionType = 'school';
      this.items = this.schoolSummaryList;
    }
  }

  get stateSelection() {
    return this.appStore().getStateSelection();
  }

  get municipalitySelection() {
    return this.appStore().getMunicipalitySelection();
  }

  get schoolSummaryList() {
    return this.appStore().getSchoolSummaryList();
  }

  get sortedItems() {
    return this.items.sort((item1, item2) => (item1.name < item2.name ? -1 : 1));
  }

  get filteredItems() {
    return this.sortedItems.filter(item => item.name.toLowerCase().indexOf(this.text.toLowerCase()) >= 0);
  }

  created() {
    this.items = this.appStore().getStateSummaryList();
  }

  selectItem(item: StateSummary | MunicipalitySummary | SchoolSummary | null) {
    if (item) {
      switch (this.nextSelectionType) {
        case 'state':
          this.appStore().selectState(item.id, SelectionSource.DROP_DOWN);
          break;
        case 'municipality':
          this.appStore().selectMunicipality(item.id, SelectionSource.DROP_DOWN);
          break;
        case 'school':
          this.appStore().selectSchool(item.id, SelectionSource.DROP_DOWN);
      }
    }
  }
}
