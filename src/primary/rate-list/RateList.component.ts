import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { RateDataSet, toRateDataSet } from '@/primary/rate-list/RateDataSet';
import { RateTypes } from '@/primary/RateTypes';

@Component
export default class RateList extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get level() {
    return this.appStore().getLevel();
  }

  get levelLabel() {
    switch (this.level) {
      case 'country':
        return 'entidad';
      case 'state':
        return 'municipio';
      case 'municipality':
        return 'escuela';
    }
    return '-';
  }

  get selectedRateType() {
    return this.appStore().getSelectedRateType();
  }

  get selectedRateTypeLabel() {
    switch (this.selectedRateType) {
      case RateTypes.STUDENT_ABSENCE:
        return 'alumnos';
      case RateTypes.TEACHER_ABSENCE:
        return 'docentes';
      case RateTypes.PERSONAL_ABSENCE:
        return 'personales';
    }
    return '-';
  }

  get stateSummaryList() {
    return this.appStore().getStateSummaryList();
  }

  get municipalitySummaryListForState() {
    return this.appStore().getMunicipalitySummaryListForState();
  }

  get schoolSummaryList() {
    return this.appStore().getSchoolSummaryList();
  }

  get selectedSchoolId() {
    return this.appStore().getSchoolSelection().schoolId;
  }

  get rateDataSets(): RateDataSet[] {
    switch (this.level) {
      case 'country':
        return this.stateSummaryList.map(state => toRateDataSet(state, this.selectedRateType));
      case 'state':
        return this.municipalitySummaryListForState.map(municipality => toRateDataSet(municipality, this.selectedRateType));
      case 'municipality':
      case 'school':
        return this.schoolSummaryList.map(school => toRateDataSet(school, this.selectedRateType));
    }
    return [];
  }

  get sortedDataSets(): RateDataSet[] {
    return this.rateDataSets.sort((rateDataSet1, rateDataSet2) => (rateDataSet1.name < rateDataSet2.name ? -1 : 1));
  }
}
