import { AdministrativeLevel } from '@/domain/AdministrativeLevel';
import { AttendanceType } from '@/domain/AttendanceType';
import { Summary } from '@/domain/Summary';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AttendanceListDataSet {
  header: string;
  entityColumnName: string;
  items: { id: string; name: string; percentage: PercentageDataSet }[];
}

const ATTENDANCE_TYPE_LABELS = {
  [AttendanceType.STUDENT]: 'alumnados',
  [AttendanceType.TEACHER]: 'docentes',
  [AttendanceType.PERSONAL]: 'personal',
};

const ADMINISTRATIVE_LEVEL_LABELS = {
  [AdministrativeLevel.COUNTRY]: 'entidad',
  [AdministrativeLevel.STATE]: 'municipio',
  [AdministrativeLevel.MUNICIPALITY]: 'escuela',
  [AdministrativeLevel.SCHOOL]: 'escuela',
};

const toEntityColumnName = (administrativeLevel: AdministrativeLevel) => {
  const label = ADMINISTRATIVE_LEVEL_LABELS[administrativeLevel];
  return `${label[0].toUpperCase()}${label.substring(1)}`;
};

const toPercentage = (attendanceType: AttendanceType, summary: Summary) => {
  switch (attendanceType) {
    case AttendanceType.STUDENT:
      return toPercentageDataSet(summary.studentAttendance);
    case AttendanceType.TEACHER:
      return toPercentageDataSet(summary.teacherAttendance);
    case AttendanceType.PERSONAL:
      return toPercentageDataSet(summary.adminAttendance);
  }
};

const toItem = (attendanceType: AttendanceType, summary: Summary) => ({
  id: summary.id,
  name: summary.name,
  percentage: toPercentage(attendanceType, summary),
});

export const toAttendanceListDataSet = (
  administrativeLevel: AdministrativeLevel,
  attendanceType: AttendanceType,
  summaries: Summary[]
): AttendanceListDataSet => ({
  header: `Porcentaje de ${ATTENDANCE_TYPE_LABELS[attendanceType]} presentes por ${ADMINISTRATIVE_LEVEL_LABELS[administrativeLevel]}`,
  entityColumnName: toEntityColumnName(administrativeLevel),
  items: summaries.map(summary => toItem(attendanceType, summary)),
});