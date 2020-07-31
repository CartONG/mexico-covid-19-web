import Vue from 'vue';

import { AttendanceType } from '@/domain/AttendanceType';

export class NavigationBus {
  constructor(private bus: Vue) {}

  switchAttendanceType(attendanceType: AttendanceType) {
    this.bus.$emit('switch:attendance', attendanceType);
  }

  onSwitchAttendanceType(callable: (attendanceType: AttendanceType) => void) {
    this.bus.$on('switch:attendance', callable);
  }
}
