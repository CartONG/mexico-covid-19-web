import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { toAbsenceDetailsDataSet } from '@/primary/absence-details/AbsenceDetailsDataSet';
import { makeChart, updateChart } from '@/primary/absence-details/PieChart';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Prop()
  readonly administrativeDivision!: AdministrativeDivision;

  @Prop()
  readonly school!: School;

  @Prop()
  readonly administrativeDivisionLevel!: boolean;

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Watch('absenceDetailsDataSet')
  absenceDetailsDataSetWatcher() {
    updateChart('absence-details-chart', 75, this.absenceDetailsDataSet.chart.data, this.absenceDetailsDataSet.chart.colors);
  }

  get absenceDetailsDataSet() {
    const absenceDetails = this.administrativeDivisionLevel ? this.administrativeDivision : this.school;
    return toAbsenceDetailsDataSet(absenceDetails, this.attendanceType);
  }

  mounted() {
    makeChart('absence-details-chart', 75, { top: 0, right: 0, bottom: 0, left: 0 });
    updateChart('absence-details-chart', 75, this.absenceDetailsDataSet.chart.data, this.absenceDetailsDataSet.chart.colors);
  }

  change(attendanceType: AttendanceType) {
    this.$emit('change', attendanceType);
  }
}
