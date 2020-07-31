import Vue from 'vue';

import { AttendanceType } from '@/domain/AttendanceType';

const SWITCH_ATTENDANCE_TYPE = 'switch:attendance';

export class AttendanceTypeBus {
  constructor(private bus: Vue) {}

  switchAttendanceType(attendanceType: AttendanceType) {
    this.bus.$emit(SWITCH_ATTENDANCE_TYPE, attendanceType);
  }

  onSwitchAttendanceType(callable: (attendanceType: AttendanceType) => void) {
    this.bus.$on(SWITCH_ATTENDANCE_TYPE, callable);
  }
}
