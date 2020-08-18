import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { AbsenceDetailsVue } from '@/primary/absence-details';
import { AdministrativeDivisionDetailsVue } from '@/primary/administrative-division-details';
import { AdministrativeDivisionHistoricVue } from '@/primary/administrative-division-historic';
import { AdministrativeDivisionIndicatorsVue } from '@/primary/administrative-division-indicators';
import { AttendanceListVue } from '@/primary/attendance-list';
import { AttendanceMapVue } from '@/primary/attendance-map';
import { HistoricType } from '@/primary/HistoricType';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { SchoolDetailsVue } from '@/primary/school-details';
import { SchoolHistoricVue } from '@/primary/school-historic';
import { SchoolIndicatorsVue } from '@/primary/school-indicators';
import { Printer } from '@/secondary/Printer';

@Component({
  components: {
    AttendanceMapVue,
    AdministrativeDivisionIndicatorsVue,
    SchoolIndicatorsVue,
    AttendanceListVue,
    AbsenceDetailsVue,
    AdministrativeDivisionDetailsVue,
    SchoolDetailsVue,
    AdministrativeDivisionHistoricVue,
    SchoolHistoricVue,
  },
})
export default class TemplatePrint extends Vue {
  mapReady = false;
  chartReady = false;

  @Inject()
  private printer!: () => Printer;

  @Prop()
  readonly currentSummaryList!: Summary[];

  @Prop()
  readonly stateSummaryList!: AdministrativeDivisionSummary[];

  @Prop()
  readonly municipalitySummaryList!: AdministrativeDivisionSummary[];

  @Prop()
  readonly schoolSummaryList!: SchoolSummary[];

  @Prop()
  readonly school!: School;

  @Prop()
  readonly schoolDailyReports!: AdministrativeDivisionDailyReport[];

  @Prop()
  readonly currentSummary!: Summary;

  @Prop()
  readonly administrativeDivisionLevel!: boolean;

  @Prop()
  readonly currentAdministrativeDivision!: AdministrativeDivision;

  @Prop()
  readonly administrativeDivisionDailyReports!: AdministrativeDivisionDailyReport[];

  @Prop()
  readonly navigation!: NavigationParams[];

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Prop()
  readonly administrativeLevel!: AdministrativeLevels;

  @Prop()
  readonly attendanceListSortOptions!: [string, string];

  @Prop()
  readonly absenceDetailsAttendanceType!: AttendanceType;

  @Prop()
  readonly historicType!: HistoricType;

  @Prop()
  readonly historicInterval!: [number, number];

  @Prop()
  readonly mapExtent!: [number, number, number, number] | null;

  @Watch('mapReady')
  mapReadyWatcher() {
    if (this.chartReady) {
      this.printer().print();
    }
  }

  @Watch('chartReady')
  chartReadyWatcher() {
    if (this.mapReady) {
      this.printer().print();
    }
  }

  get lastUpdateDate() {
    const entity = this.administrativeLevel ? this.currentAdministrativeDivision : this.school;
    return entity ? `Información correspondiente al ${entity.lastUpdateDate.toHuman()}` : '';
  }

  get currentSummariesChunks() {
    const sortAsc = (val1: string | number, val2: string | number) => (val1 < val2 ? -1 : 1);
    const sortDesc = (val1: string | number, val2: string | number) => (val1 > val2 ? -1 : 1);
    const sorter = this.attendanceListSortOptions[1] === 'asc' ? sortAsc : sortDesc;

    const valueToSort = (summary: Summary) =>
      this.attendanceListSortOptions[0] === 'name'
        ? summary.name
        : this.attendanceType === AttendanceType.STUDENT
        ? summary.studentAttendance
        : this.attendanceType === AttendanceType.TEACHER
        ? summary.teacherAttendance
        : summary.adminAttendance;

    const summaries = [...this.currentSummaryList].sort((summary1, summary2) => sorter(valueToSort(summary1), valueToSort(summary2)));

    const chunkLength = 20;
    const chunksLength = Math.ceil(summaries.length / chunkLength);

    return Array(chunksLength)
      .fill(0)
      .map((value, index) => summaries.slice(index * chunkLength, (index + 1) * chunkLength));
  }

  created() {
    this.printer().onAfterPrint(this.onAfterPrint);
  }

  beforeDestroy() {
    this.printer().offAfterPrint(this.onAfterPrint);
  }

  onAfterPrint() {
    this.$emit('endprinting');
  }
}
