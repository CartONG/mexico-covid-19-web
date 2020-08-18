import { Component, Prop, Vue } from 'vue-property-decorator';

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
import { ExportDropdownVue } from '@/primary/export-dropdown';
import { HistoricType } from '@/primary/HistoricType';
import { InfoModalVue } from '@/primary/info-modal';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { SchoolDetailsVue } from '@/primary/school-details';
import { SchoolHistoricVue } from '@/primary/school-historic';
import { SchoolIndicatorsVue } from '@/primary/school-indicators';

@Component({
  components: {
    InfoModalVue,
    AttendanceMapVue,
    AdministrativeDivisionIndicatorsVue,
    SchoolIndicatorsVue,
    AttendanceListVue,
    AbsenceDetailsVue,
    AdministrativeDivisionDetailsVue,
    SchoolDetailsVue,
    AdministrativeDivisionHistoricVue,
    ExportDropdownVue,
    SchoolHistoricVue,
  },
})
export default class TemplateWeb extends Vue {
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

  get lastUpdateDate() {
    const entity = this.administrativeLevel ? this.currentAdministrativeDivision : this.school;
    return entity ? `Información correspondiente al ${entity.lastUpdateDate.toHuman()}` : '';
  }
}
