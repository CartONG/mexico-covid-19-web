import { Component, Inject, Vue } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toSummaryDataSet } from '@/primary/choropleth-map/rate-tabs/SummaryDataSet';
import { RateTypes } from '@/primary/RateTypes';

@Component
export default class RateList extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get navigation() {
    return this.appStore().getNavigation();
  }

  get levelLabel() {
    return this.navigation.stateId === '' ? 'entidad' : this.navigation.municipalityId === '' ? 'municipio' : 'escuela';
  }

  get selectedRateTypeLabel() {
    return this.selectedRateType === RateTypes.STUDENT_ABSENCE
      ? 'alumnos'
      : this.selectedRateType === RateTypes.TEACHER_ABSENCE
      ? 'docentes'
      : 'personal';
  }

  get selectedRateType() {
    return this.appStore().getSelectedRateType();
  }

  get selectedSchoolId() {
    return this.appStore().getSchoolSelection().schoolId;
  }

  get summaryList() {
    return this.appStore().getCurrentSummaryList();
  }

  get summaryDataSets() {
    return this.summaryList
      .map(toSummaryDataSet)
      .sort((summaryDataSet1, summaryDataSet2) => (summaryDataSet1.name < summaryDataSet2.name ? -1 : 1));
  }
}