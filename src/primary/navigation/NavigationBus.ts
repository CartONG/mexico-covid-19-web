import Vue from 'vue';

import { NavigationParams } from '@/primary/navigation/NavigationParams';

const BACK_TO_COUNTRY = 'back:country';
const BACK_TO_STATE = 'back:state';
const BACK_TO_MUNICIPALITY = 'back:municipality';
const GO_TO_STATE = 'go:state';
const GO_TO_MUNICIPALITY = 'go:municipality';
const GO_TO_SCHOOL = 'go:school';

export class NavigationBus {
  constructor(private bus: Vue) {}

  backToCountry() {
    this.bus.$emit(BACK_TO_COUNTRY);
  }

  backToState(navigationParams: NavigationParams) {
    this.bus.$emit(BACK_TO_STATE, navigationParams);
  }

  backToMunicipality(navigationParams: NavigationParams) {
    this.bus.$emit(BACK_TO_MUNICIPALITY, navigationParams);
  }

  goToState(navigationParams: NavigationParams) {
    this.bus.$emit(GO_TO_STATE, navigationParams);
  }

  goToMunicipality(navigationParams: NavigationParams) {
    this.bus.$emit(GO_TO_MUNICIPALITY, navigationParams);
  }

  goToSchool(navigationParams: NavigationParams) {
    this.bus.$emit(GO_TO_SCHOOL, navigationParams);
  }

  onBackToCountry(callable: () => void) {
    this.bus.$on(BACK_TO_COUNTRY, callable);
  }

  onBackToState(callable: (navigationParams: NavigationParams) => void) {
    this.bus.$on(BACK_TO_STATE, callable);
  }

  onBackToMunicipality(callable: (navigationParams: NavigationParams) => void) {
    this.bus.$on(BACK_TO_MUNICIPALITY, callable);
  }

  onGoToState(callable: (navigationParams: NavigationParams) => void) {
    this.bus.$on(GO_TO_STATE, callable);
  }

  onGoToMunicipality(callable: (navigationParams: NavigationParams) => void) {
    this.bus.$on(GO_TO_MUNICIPALITY, callable);
  }

  onGoToSchool(callable: (navigationParams: NavigationParams) => void) {
    this.bus.$on(GO_TO_SCHOOL, callable);
  }

  destroy() {
    this.bus.$destroy();
  }
}
