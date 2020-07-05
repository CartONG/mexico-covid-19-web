import { Component, Inject, Vue } from 'vue-property-decorator';

import { SelectionSource } from '@/domain/selection/SelectionSource';
import { AppStore } from '@/primary/app/AppStore';
import { toSummaryDataSet } from '@/primary/common/SummaryDataSet';
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

  get tableLabel() {
    return `${this.levelLabel[0].toUpperCase()}${this.levelLabel.substring(1)}`;
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

  select(entityId: string) {
    this.navigation.stateId === ''
      ? this.appStore().selectState(entityId, SelectionSource.RATE_LIST)
      : this.navigation.municipalityId === ''
      ? this.appStore().selectMunicipality(entityId, SelectionSource.RATE_LIST)
      : this.appStore().selectSchool(entityId, SelectionSource.RATE_LIST);
  }
}
