import { StoreOptions } from 'vuex';

import { Country } from '@/domain/country/Country';
import { Municipality } from '@/domain/municipality/Municipality';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { State } from '@/domain/state/State';
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
  level: 'country' | 'state' | 'municipality' | 'school';
  country: Country | undefined;
  state: State | undefined;
  municipality: Municipality | undefined;
  school: School | undefined;
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
    level: 'country',
    country: undefined,
    state: undefined,
    municipality: undefined,
    school: undefined,
    stateSummaryList: [],
    municipalitySummaryList: [],
    schoolSummaryList: [],
    stateSelection: { stateId: '', source: SelectionSource.MAP },
    municipalitySelection: { municipalityId: '', source: SelectionSource.MAP },
    schoolSelection: { schoolId: '', source: SelectionSource.MAP },
    selectedRateType: RateTypes.STUDENT_ABSENCE,
  },
  mutations: {
    setCountry(state: AppState, country: Country | undefined) {
      state.country = country;
    },
    setState(appState: AppState, state: State | undefined) {
      appState.state = state;
    },
    setMunicipality(state: AppState, municipality: Municipality | undefined) {
      state.municipality = municipality;
    },
    setSchool(state: AppState, school: School | undefined) {
      state.school = school;
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
    selectCountry(appState: AppState, source: SelectionSource) {
      appState.level = 'country';
      appState.stateSelection = { stateId: '', source };
      appState.municipalitySelection = { municipalityId: '', source };
      appState.schoolSelection = { schoolId: '', source };
      appState.state = undefined;
      appState.municipality = undefined;
    },
    selectState(appState: AppState, stateSelection: StateSelection) {
      appState.level = 'state';
      appState.state = stateSelection.stateId !== appState.stateSelection.stateId ? undefined : appState.state;
      appState.stateSelection = stateSelection;
      appState.municipalitySelection = { municipalityId: '', source: stateSelection.source };
      appState.schoolSelection = { schoolId: '', source: stateSelection.source };
      appState.municipality = undefined;
    },
    selectMunicipality(state: AppState, municipalitySelection: MunicipalitySelection) {
      state.level = 'municipality';
      state.municipality =
        municipalitySelection.municipalityId !== state.municipalitySelection.municipalityId ? undefined : state.municipality;
      state.municipalitySelection = municipalitySelection;
      state.schoolSelection = { schoolId: '', source: municipalitySelection.source };
    },
    selectSchool(state: AppState, schoolSelection: SchoolSelection) {
      state.level = 'school';
      state.school = undefined;
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
