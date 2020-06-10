import { StoreOptions } from 'vuex';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Selection } from '@/domain/selection/Selection';
import { StateSummary } from '@/domain/state/StateSummary';

export interface AppState {
  stateSummaryList: StateSummary[];
  municipalitySummaryList: MunicipalitySummary[];
  schoolSummaryList: SchoolSummary[];
  selection: Selection | null;
}

export const storeOptions: StoreOptions<AppState> = {
  state: {
    stateSummaryList: [],
    municipalitySummaryList: [],
    schoolSummaryList: [],
    selection: null,
  },
  mutations: {
    setStateSummaryList(state: AppState, stateSummaryList: StateSummary[]) {
      state.stateSummaryList = stateSummaryList;
    },
    setMunicipalitySummaryList(state: AppState, municipalitySummaryList: MunicipalitySummary[]) {
      state.municipalitySummaryList = municipalitySummaryList;
    },
    setSchoolSummaryList(state: AppState, schoolSummaryList: SchoolSummary[]) {
      state.schoolSummaryList = schoolSummaryList;
    },
    select(state: AppState, selection: Selection | null) {
      state.selection = selection;
    },
  },
  getters: {
    stateSummaryById: (state: AppState) => {
      return state.stateSummaryList.reduce((accumulator, stateSummary) => ({ ...accumulator, [stateSummary.id]: stateSummary }), {});
    },
    municipalitySummaryById: (state: AppState) => {
      return state.municipalitySummaryList.reduce((accumulator, municipality) => ({ ...accumulator, [municipality.id]: municipality }), {});
    },
  },
};
