import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { SelectionType } from '@/domain/selection/SelectionType';
import { StateSummary } from '@/domain/state/StateSummary';
import { AppStore } from '@/primary/app/AppStore';

@Component
export default class Dropdown extends Vue {
  text: string = '';
  items: StateSummary[] | MunicipalitySummary[] = [];
  selectionType: SelectionType = SelectionType.STATE;

  @Inject()
  appStore!: () => AppStore;

  @Watch('selection')
  selectionWatcher() {
    if (this.selection === null) {
      this.selectionType = SelectionType.STATE;
      this.items = [...this.appStore().getStateSummaryList()];
      return;
    }

    if (this.selection.type === SelectionType.STATE) {
      this.selectionType = SelectionType.MUNICIPALITY;
      this.items = this.appStore()
        .getMunicipalitySummaryList()
        .filter(municipalitySummary => municipalitySummary.stateId === this.selection?.stateId);
    }
  }

  get selection() {
    return this.appStore().getSelection();
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

  selectItem(item: StateSummary | MunicipalitySummary | null) {
    if (item === null) {
      this.appStore().select(null);
      return;
    }

    const selection = { type: this.selectionType, source: SelectionSource.DROP_DOWN };

    if (selection.type === SelectionType.STATE) {
      this.appStore().select({
        ...selection,
        stateId: item.id,
        municipalityId: '',
        schoolId: '',
      });
      return;
    }

    if (this.selection && selection.type === SelectionType.MUNICIPALITY) {
      this.appStore().select({
        ...selection,
        stateId: this.selection?.stateId,
        municipalityId: item.id,
        schoolId: '',
      });
      return;
    }
  }
}
