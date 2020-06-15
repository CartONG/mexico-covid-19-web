import { Store } from 'vuex';

import { Country } from '@/domain/country/Country';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { StateSummary } from '@/domain/state/StateSummary';
import { AppState, MunicipalitySelection, SchoolSelection, StateSelection } from '@/primary/app/storeOptions';
import { RateTypes } from '@/primary/RateTypes';

export class AppStore {
  constructor(private store: Store<AppState>) {}

  saveCountry(country: Country) {
    this.store.commit('setCountry', country);
  }

  getCountry(): Country | undefined {
    return this.store.state.country;
  }

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

  saveSchoolSummaryList(schoolSummaryList: SchoolSummary[]) {
    return this.store.commit('setSchoolSummaryList', schoolSummaryList);
  }

  getSchoolSummaryList(): SchoolSummary[] {
    return this.store.state.schoolSummaryList;
  }

  selectCountry(source: SelectionSource) {
    this.store.commit('selectCountry', source);
  }

  selectState(stateId: string, source: SelectionSource) {
    this.store.commit('selectState', { stateId, source });
  }

  getStateSelection(): StateSelection {
    return this.store.state.stateSelection;
  }

  getSelectedState(): StateSummary | undefined {
    return this.store.getters.selectedState;
  }

  selectMunicipality(municipalityId: string, source: SelectionSource) {
    this.store.commit('selectMunicipality', { municipalityId, source });
  }

  getMunicipalitySelection(): MunicipalitySelection {
    return this.store.state.municipalitySelection;
  }

  getSelectedMunicipality(): MunicipalitySummary | undefined {
    return this.store.getters.selectedMunicipality;
  }

  selectSchool(schoolId: string, source: SelectionSource) {
    this.store.commit('selectSchool', { schoolId, source });
  }

  getSchoolSelection(): SchoolSelection {
    return this.store.state.schoolSelection;
  }

  getSelectedSchool(): SchoolSummary | undefined {
    return this.store.getters.selectedSchool;
  }

  getSelectedRateType(): RateTypes {
    return this.store.state.selectedRateType;
  }

  selectRateType(rateType: RateTypes) {
    this.store.commit('selectRateType', rateType);
  }
}
