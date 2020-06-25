import { Store } from 'vuex';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { ReportSummary } from '@/domain/ReportSummary';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { Summary } from '@/domain/Summary';
import { AppState, MunicipalitySelection, Navigation, SchoolSelection, StateSelection } from '@/primary/app/storeOptions';
import { RateTypes } from '@/primary/RateTypes';

export class AppStore {
  constructor(private store: Store<AppState>) {}

  getLevel(): string {
    return this.store.state.level;
  }

  getNavigation(): Navigation {
    return this.store.state.navigation;
  }

  getCurrentSummary(): Summary | undefined {
    return this.store.state.currentSummary;
  }

  getCurrentSummaryList(): Summary[] {
    return this.store.getters.currentSummaryList;
  }

  getCurrentAdministrativeDivision(): AdministrativeDivision | undefined {
    return this.store.getters.currentAdministrativeDivision;
  }

  saveCountry(country: AdministrativeDivision) {
    this.store.commit('setCountry', country);
  }

  getCountry(): AdministrativeDivision | undefined {
    return this.store.state.country;
  }

  saveState(state: AdministrativeDivision | undefined) {
    this.store.commit('setState', state);
  }

  getState() {
    return this.store.state.state;
  }

  saveMunicipality(municipality: AdministrativeDivision | undefined) {
    this.store.commit('setMunicipality', municipality);
  }

  getMunicipality() {
    return this.store.state.municipality;
  }

  saveSchool(school: School | undefined) {
    this.store.commit('setSchool', school);
  }

  getSchool(): School | undefined {
    return this.store.state.school;
  }

  saveStateSummaryList(stateSummaryList: AdministrativeDivisionSummary[]) {
    this.store.commit('setStateSummaryList', stateSummaryList);
  }

  getStateSummaryList(): AdministrativeDivisionSummary[] {
    return this.store.state.stateSummaryList;
  }

  getStateSummaryById(): { [key: string]: AdministrativeDivisionSummary } {
    return this.store.getters.stateSummaryById;
  }

  saveMunicipalitySummaryList(municipalitySummaryList: AdministrativeDivisionSummary[]) {
    this.store.commit('setMunicipalitySummaryList', municipalitySummaryList);
  }

  getMunicipalitySummaryList(): AdministrativeDivisionSummary[] {
    return this.store.state.municipalitySummaryList;
  }

  getMunicipalitySummaryById(): { [key: string]: AdministrativeDivisionSummary } {
    return this.store.getters.municipalitySummaryById;
  }

  getMunicipalitySummaryByStateId(): { [key: string]: AdministrativeDivisionSummary[] } {
    return this.store.getters.municipalitySummaryByStateId;
  }

  getMunicipalitySummaryListForState(): AdministrativeDivisionSummary[] {
    return this.store.getters.municipalitySummaryListForState;
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

  getSelectedState(): AdministrativeDivisionSummary | undefined {
    return this.store.getters.selectedState;
  }

  selectMunicipality(municipalityId: string, source: SelectionSource) {
    this.store.commit('selectMunicipality', { municipalityId, source });
  }

  getMunicipalitySelection(): MunicipalitySelection {
    return this.store.state.municipalitySelection;
  }

  getSelectedMunicipality(): AdministrativeDivisionSummary | undefined {
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
