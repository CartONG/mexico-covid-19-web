import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AttendanceType } from '@/domain/AttendanceType';
import { Summary } from '@/domain/Summary';
import { AttendanceCardVue } from '@/primary/attendance-map/attendance-card';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { toSummaryDataSet } from '@/primary/common/SummaryDataSet';

@Component({
  components: { AttendanceCardVue },
})
export default class RateTabs extends Vue {
  @Inject()
  private attendanceTypeBus!: () => AttendanceTypeBus;

  @Prop()
  private summary!: Summary;

  @Prop({ default: false, required: false })
  readonly inline!: boolean;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  @Prop()
  readonly attendanceType!: AttendanceType;

  get summaryDataSet() {
    return toSummaryDataSet(this.summary);
  }

  selectAttendanceType(attendanceType: AttendanceType) {
    this.attendanceTypeBus().switchAttendanceType(attendanceType);
  }
}
