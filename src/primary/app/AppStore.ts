import { Store } from 'vuex';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { Selection } from '@/domain/selection/Selection';
import { StateSummary } from '@/domain/state/StateSummary';
import { AppState } from '@/primary/app/storeOptions';

export class AppStore {
  constructor(private store: Store<AppState>) {}

  saveStateSummaryList(stateSummaryList: StateSummary[]) {
    this.store.commit('setStateSummaryList', stateSummaryList);
  }

  getStateSummaryList(): StateSummary[] {
    return this.store.state.stateSummaryList;
  }

  getStateSummaryById(): { [key: string]: StateSummary } {
    return this.store.getters.stateSummaryById;
  }

  saveMunicipalitySummaryList(municipalitySummaryList: MunicipalitySummary[]) {
    this.store.commit('setMunicipalitySummaryList', municipalitySummaryList);
  }

  getMunicipalitySummaryList(): MunicipalitySummary[] {
    return this.store.state.municipalitySummaryList;
  }

  getMunicipalitySummaryById(): { [key: string]: MunicipalitySummary } {
    return this.store.getters.municipalitySummaryById;
  }

  select(selection: Selection | null) {
    this.store.commit('select', selection);
  }

  getSelection(): Selection | null {
    return this.store.state.selection;
  }
}
