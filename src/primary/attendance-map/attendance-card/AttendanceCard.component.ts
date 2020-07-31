import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { makeCanvasChart, makeChart, updateChart } from '@/primary/AttendanceChart';
import { AttendanceDataSet } from '@/primary/common/AttendanceDataSet';
import { Delayer } from '@/primary/Delayer';

@Component
export default class AttendanceCard extends Vue {
  @Inject()
  private animationDelayer!: () => Delayer;

  @Prop()
  readonly attendance!: AttendanceDataSet;

  @Prop({ default: false, required: false })
  readonly light!: boolean;

  @Prop({ default: false, required: false })
  readonly inline!: boolean;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  @Watch('attendance')
  valueWatcher(newAttendance: AttendanceDataSet, oldAttendance: AttendanceDataSet) {
    const newAttendanceValue = newAttendance.percentage.value;
    const formerAttendanceValue = oldAttendance.percentage.value;
    const color = newAttendance.percentage.color;

    this.animationDelayer().afterDelay(() => {
      updateChart(this.chartSelectorId, newAttendanceValue, formerAttendanceValue, color, 500);
    });
  }

  get chartSelectorId() {
    return `${this.attendance.label}-attendance-chart`;
  }

  mounted() {
    const attendance = this.attendance.percentage.value;
    const color = this.attendance.percentage.color;

    if (this.printable) {
      makeCanvasChart(this.chartSelectorId, attendance, color);
    } else {
      makeChart(this.chartSelectorId, attendance, color, 500);
    }
  }
}
