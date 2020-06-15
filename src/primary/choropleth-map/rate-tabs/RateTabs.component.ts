import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { Country } from '@/domain/country/Country';
import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { StateSummary } from '@/domain/state/StateSummary';
import { AppStore } from '@/primary/app/AppStore';
import { RateTabDataSet, toRateTabDataSet } from '@/primary/choropleth-map/rate-tabs/RateTabDataSet';
import { RateTypes } from '@/primary/RateTypes';

@Component
export default class RateTabs extends Vue {
  rateTabsDataSets = this.unknownRateDataSets();

  @Inject()
  private appStore!: () => AppStore;

  get stateSelection() {
    return this.appStore().getStateSelection();
  }

  get municipalitySelection() {
    return this.appStore().getMunicipalitySelection();
  }

  get schoolSelection() {
    return this.appStore().getSchoolSelection();
  }

  get selectedRateType() {
    return this.appStore().getSelectedRateType();
  }

  @Watch('stateSelection')
  stateSelectionWatcher() {
    const entity = this.stateSelection.stateId === '' ? this.appStore().getCountry() : this.appStore().getSelectedState();
    this.rateTabsDataSets = this.toRateDataSets(entity);
  }

  @Watch('municipalitySelection')
  municipalitySelectionWatcher() {
    if (this.municipalitySelection.municipalityId) {
      this.rateTabsDataSets = this.toRateDataSets(this.appStore().getSelectedMunicipality());
    }
  }

  @Watch('schoolSelection')
  schoolSelectionWatcher() {
    if (this.schoolSelection.schoolId) {
      this.rateTabsDataSets = this.toRateDataSets(this.appStore().getSelectedSchool());
    }
  }

  created() {
    this.rateTabsDataSets = this.toRateDataSets(this.appStore().getCountry());
  }

  toRateDataSets(entity: Country | StateSummary | MunicipalitySummary | SchoolSummary | undefined): RateTabDataSet[] {
    return entity === undefined
      ? this.unknownRateDataSets()
      : [
          toRateTabDataSet('Alumnos', RateTypes.STUDENT_ABSENCE, entity.studentAbsenceRate),
          toRateTabDataSet('Docentes', RateTypes.TEACHER_ABSENCE, entity.teacherAbsenceRate),
          toRateTabDataSet('Personal', RateTypes.PERSONAL_ABSENCE, entity.adminAbsenceRate),
        ];
  }

  unknownRateDataSets() {
    return [
      toRateTabDataSet('Alumnos', RateTypes.STUDENT_ABSENCE, -1),
      toRateTabDataSet('Docentes', RateTypes.TEACHER_ABSENCE, -1),
      toRateTabDataSet('Personal', RateTypes.PERSONAL_ABSENCE, -1),
    ];
  }

  selectRateType(rateType: RateTypes) {
    this.appStore().selectRateType(rateType);
  }
}
