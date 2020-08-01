import { Component, Prop, Vue } from 'vue-property-decorator';

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
import { DropdownVue } from '@/primary/dropdown';
import { ExportDropdownVue } from '@/primary/export-dropdown';
import { HistoricVue } from '@/primary/historic';
import { InfoModalVue } from '@/primary/info-modal';
import { NavigationParams } from '@/primary/navigation/NavigationParams';
import { SchoolDetailsVue } from '@/primary/school-details';
import { SchoolIndicatorsVue } from '@/primary/school-indicators';

@Component({
  components: {
    BreadcrumbVue,
    InfoModalVue,
    AttendanceMapVue,
    AdministrativeDivisionIndicatorsVue,
    SchoolIndicatorsVue,
    AttendanceListVue,
    AbsenceDetailsVue,
    AdministrativeDivisionDetailsVue,
    SchoolDetailsVue,
    HistoricVue,
    DropdownVue,
    ExportDropdownVue,
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
}
