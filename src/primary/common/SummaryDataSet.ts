import { Summary } from '@/domain/Summary';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface SummaryDataSet {
  id: string;
  name: string;
  studentAttendance: PercentageDataSet;
  teacherAttendance: PercentageDataSet;
  adminAttendance: PercentageDataSet;
}

export const toSummaryDataSet = (summary: Summary | undefined): SummaryDataSet =>
  summary
    ? {
        id: summary.id,
        name: summary.name,
        studentAttendance: toPercentageDataSet(summary.maleStudentAttendance),
        teacherAttendance: toPercentageDataSet(summary.teacherAttendance),
        adminAttendance: toPercentageDataSet(summary.adminAttendance),
      }
    : {
        id: '-',
        name: '-',
        studentAttendance: toPercentageDataSet(-1),
        teacherAttendance: toPercentageDataSet(-1),
        adminAttendance: toPercentageDataSet(-1),
      };
