import { Summary } from '@/domain/Summary';
import { AttendanceDataSet, toAttendanceDataset } from '@/primary/common/AttendanceDataSet';
import { RateTypes } from '@/primary/RateTypes';

export interface SummaryDataSet {
  id: string;
  name: string;
  studentAttendance: AttendanceDataSet;
  teacherAttendance: AttendanceDataSet;
  adminAttendance: AttendanceDataSet;
}

export const toSummaryDataSet = (summary: Summary | undefined): SummaryDataSet =>
  summary
    ? {
        id: summary.id,
        name: summary.name,
        studentAttendance: toAttendanceDataset(summary.maleStudentAttendance, RateTypes.STUDENT),
        teacherAttendance: toAttendanceDataset(summary.teacherAttendance, RateTypes.TEACHER),
        adminAttendance: toAttendanceDataset(summary.adminAttendance, RateTypes.PERSONAL),
      }
    : {
        id: '-',
        name: '-',
        studentAttendance: toAttendanceDataset(-1, RateTypes.STUDENT),
        teacherAttendance: toAttendanceDataset(-1, RateTypes.TEACHER),
        adminAttendance: toAttendanceDataset(-1, RateTypes.PERSONAL),
      };
