import { StoreOptions } from 'vuex';

import { Country } from '@/domain/country/Country';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { StateSummary } from '@/domain/state/StateSummary';
import { RateTypes } from '@/primary/RateTypes';

export interface StateSelection {
  stateId: string;
  source: SelectionSource;
}

export interface MunicipalitySelection {
  municipalityId: string;
  source: SelectionSource;
}

export interface SchoolSelection {
  schoolId: string;
  source: SelectionSource;
}

export interface AppState {
  country: Country | undefined;
  stateSummaryList: StateSummary[];
  municipalitySummaryList: MunicipalitySummary[];
  schoolSummaryList: SchoolSummary[];
  stateSelection: StateSelection;
  municipalitySelection: MunicipalitySelection;
  schoolSelection: SchoolSelection;
  selectedRateType: RateTypes;
}

export const storeOptions: StoreOptions<AppState> = {
  state: {
    country: undefined,
    stateSummaryList: [],
    municipalitySummaryList: [],
    schoolSummaryList: [],
    stateSelection: { stateId: '', source: SelectionSource.MAP },
    municipalitySelection: { municipalityId: '', source: SelectionSource.MAP },
    schoolSelection: { schoolId: '', source: SelectionSource.MAP },
    selectedRateType: RateTypes.STUDENT_ABSENCE,
  },
  mutations: {
    setCountry(state: AppState, country: Country) {
      state.country = country;
    },
    setStateSummaryList(state: AppState, stateSummaryList: StateSummary[]) {
      state.stateSummaryList = stateSummaryList;
    },
    setMunicipalitySummaryList(state: AppState, municipalitySummaryList: MunicipalitySummary[]) {
      state.municipalitySummaryList = municipalitySummaryList;
    },
    setSchoolSummaryList(state: AppState, schoolSummaryList: SchoolSummary[]) {
      state.schoolSummaryList = schoolSummaryList;
    },
    selectCountry(state: AppState, source: SelectionSource) {
      state.stateSelection = { stateId: '', source };
      state.municipalitySelection = { municipalityId: '', source };
      state.schoolSelection = { schoolId: '', source };
    },
    selectState(state: AppState, stateSelection: StateSelection) {
      state.stateSelection = stateSelection;
      state.municipalitySelection = { municipalityId: '', source: stateSelection.source };
      state.schoolSelection = { schoolId: '', source: stateSelection.source };
    },
    selectMunicipality(state: AppState, municipalitySelection: MunicipalitySelection) {
      state.municipalitySelection = municipalitySelection;
      state.schoolSelection = { schoolId: '', source: municipalitySelection.source };
    },
    selectSchool(state: AppState, schoolSelection: SchoolSelection) {
      state.schoolSelection = schoolSelection;
    },
    selectRateType(state: AppState, rateType: RateTypes) {
      state.selectedRateType = rateType;
    },
  },
  getters: {
    stateSummaryById: (state: AppState) => {
      return state.stateSummaryList.reduce((accumulator, stateSummary) => ({ ...accumulator, [stateSummary.id]: stateSummary }), {});
    },
    municipalitySummaryById: (state: AppState) => {
      return state.municipalitySummaryList.reduce((accumulator, municipality) => ({ ...accumulator, [municipality.id]: municipality }), {});
    },
    schoolSummaryById: (state: AppState) => {
      return state.schoolSummaryList.reduce((accumulator, school) => ({ ...accumulator, [school.id]: school }), {});
    },
    selectedState: (state: AppState, getters) => {
      return getters.stateSummaryById[state.stateSelection.stateId];
    },
    selectedMunicipality: (state: AppState, getters) => {
      return getters.municipalitySummaryById[state.municipalitySelection.municipalityId];
    },
    selectedSchool: (state: AppState, getters) => {
      return getters.schoolSummaryById[state.schoolSelection.schoolId];
    },
  },
};
