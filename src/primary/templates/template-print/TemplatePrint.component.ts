import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';
import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeLevel } from '@/domain/AdministrativeLevel';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { AbsenceDetailsVue } from '@/primary/absence-details';
import { AdministrativeDivisionDetailsVue } from '@/primary/administrative-division-details';
import { AdministrativeDivisionIndicatorsVue } from '@/primary/administrative-division-indicators';
import { AttendanceListVue } from '@/primary/attendance-list';
import { AttendanceMapVue } from '@/primary/attendance-map';
import { BreadcrumbVue } from '@/primary/breadcrumb';
import { HistoricVue } from '@/primary/historic';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { SchoolDetailsVue } from '@/primary/school-details';
import { SchoolIndicatorsVue } from '@/primary/school-indicators';
import { Printer } from '@/secondary/Printer';

@Component({
  components: {
    BreadcrumbVue,
    AttendanceMapVue,
    AdministrativeDivisionIndicatorsVue,
    SchoolIndicatorsVue,
    AttendanceListVue,
    AbsenceDetailsVue,
    AdministrativeDivisionDetailsVue,
    SchoolDetailsVue,
    HistoricVue,
  },
})
export default class TemplatePrint extends Vue {
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
  readonly currentSummary!: Summary;

  @Prop()
  readonly administrativeDivisionLevel!: boolean;

  @Prop()
  readonly currentAdministrativeDivision!: AdministrativeDivision;

  @Prop()
  readonly currentHistoryItems!: AdministrativeDivisionHistory[];

  @Prop()
  readonly navigation!: NavigationParams[];

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Prop()
  readonly administrativeLevel!: AdministrativeLevel;

  @Prop()
  readonly attendanceListSortOptions!: [string, string];

  @Prop()
  readonly absenceDetailsAttendanceType!: AttendanceType;

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
