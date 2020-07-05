import { StoreOptions } from 'vuex';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { Summary } from '@/domain/Summary';
import { RateTypes } from '@/primary/RateTypes';

export interface Navigation {
  stateId: string;
  stateName: string;
  municipalityId: string;
  municipalityName: string;
  schoolId: string;
  schoolName: string;
}

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
  navigation: Navigation;
  currentSummary: Summary | undefined;
  country: AdministrativeDivision | undefined;
  state: AdministrativeDivision | undefined;
  municipality: AdministrativeDivision | undefined;
  school: School | undefined;
  stateSummaryList: AdministrativeDivisionSummary[];
  municipalitySummaryList: AdministrativeDivisionSummary[];
  schoolSummaryList: SchoolSummary[];
  stateSelection: StateSelection;
  municipalitySelection: MunicipalitySelection;
  schoolSelection: SchoolSelection;
  selectedRateType: RateTypes;
}

export const storeOptions: StoreOptions<AppState> = {
  state: {
    level: 'country',
    navigation: { stateId: '', stateName: '', municipalityId: '', municipalityName: '', schoolId: '', schoolName: '' },
    currentSummary: undefined,
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
    setCountry(state: AppState, country: AdministrativeDivision | undefined) {
      state.currentSummary = country;
      state.country = country;
    },
    setState(appState: AppState, state: AdministrativeDivision | undefined) {
      appState.state = state;
    },
    setMunicipality(state: AppState, municipality: AdministrativeDivision | undefined) {
      state.municipality = municipality;
    },
    setSchool(state: AppState, school: School | undefined) {
      state.school = school;
    },
    setStateSummaryList(state: AppState, stateSummaryList: AdministrativeDivision[]) {
      state.stateSummaryList = stateSummaryList;
    },
    setMunicipalitySummaryList(state: AppState, municipalitySummaryList: AdministrativeDivision[]) {
      state.municipalitySummaryList = municipalitySummaryList;
    },
    setSchoolSummaryList(state: AppState, schoolSummaryList: SchoolSummary[]) {
      state.schoolSummaryList = schoolSummaryList;
    },
    selectCountry(appState: AppState, source: SelectionSource) {
      appState.level = 'country';
      appState.navigation = { stateId: '', stateName: '', municipalityId: '', municipalityName: '', schoolId: '', schoolName: '' };
      appState.currentSummary = appState.country;
      appState.stateSelection = { stateId: '', source };
      appState.municipalitySelection = { municipalityId: '', source };
      appState.schoolSelection = { schoolId: '', source };
      appState.state = undefined;
      appState.municipality = undefined;
    },
    selectState(appState: AppState, stateSelection: StateSelection) {
      const summary = appState.stateSummaryList.find(state => state.id === stateSelection.stateId);
      appState.level = 'state';
      appState.navigation = {
        stateId: stateSelection.stateId,
        stateName: summary ? summary.name : '',
        municipalityId: '',
        municipalityName: '',
        schoolId: '',
        schoolName: '',
      };
      appState.currentSummary = summary;
      appState.state = stateSelection.stateId !== appState.stateSelection.stateId ? undefined : appState.state;
      appState.stateSelection = stateSelection;
      appState.municipalitySelection = { municipalityId: '', source: stateSelection.source };
      appState.schoolSelection = { schoolId: '', source: stateSelection.source };
      appState.municipality = undefined;
    },
    selectMunicipality(state: AppState, municipalitySelection: MunicipalitySelection) {
      const summary = state.municipalitySummaryList.find(municipality => municipality.id === municipalitySelection.municipalityId);
      state.level = 'municipality';
      state.navigation = {
        ...state.navigation,
        municipalityId: municipalitySelection.municipalityId,
        municipalityName: summary ? summary.name : '',
        schoolId: '',
        schoolName: '',
      };
      state.currentSummary = summary;
      state.municipality =
        municipalitySelection.municipalityId !== state.municipalitySelection.municipalityId ? undefined : state.municipality;
      state.municipalitySelection = municipalitySelection;
      state.schoolSelection = { schoolId: '', source: municipalitySelection.source };
    },
    selectSchool(state: AppState, schoolSelection: SchoolSelection) {
      const summary = state.schoolSummaryList.find(schoolSummary => schoolSummary.id === schoolSelection.schoolId);
      state.level = 'school';
      state.navigation = { ...state.navigation, schoolId: schoolSelection.schoolId, schoolName: summary ? summary.name : '' };
      state.currentSummary = summary;
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
    municipalitySummaryByStateId: (state: AppState) => {
      return state.municipalitySummaryList.reduce((accumulator: { [key: string]: AdministrativeDivisionSummary[] }, municipality) => {
        const municipalities = accumulator[municipality.stateId] ? accumulator[municipality.stateId] : [];
        return { ...accumulator, [municipality.stateId]: [...municipalities, municipality] };
      }, {});
    },
    municipalitySummaryListForState: (state, getters) => {
      return getters.municipalitySummaryByStateId[state.stateSelection.stateId] || [];
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
    currentAdministrativeDivision: (state: AppState, getters) => {
      return state.navigation.stateId === '' ? state.country : state.navigation.municipalityId === '' ? state.state : state.municipality;
    },
    currentSummaryList: (state: AppState, getters) => {
      return state.navigation.stateId === ''
        ? state.stateSummaryList
        : state.navigation.municipalityId === ''
        ? state.municipalitySummaryList.filter(summary => summary.stateId === state.navigation.stateId)
        : state.schoolSummaryList;
    },
  },
};
