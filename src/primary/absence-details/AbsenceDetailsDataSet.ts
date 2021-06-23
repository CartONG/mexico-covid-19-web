import { AttendanceType } from '@/domain/AttendanceType';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AbsenceReasonsPercentages {
  studentAbsenceMainReasonsPercentages: { [key: string]: number };
  teacherAbsenceMainReasonsPercentages: { [key: string]: number };
  adminAbsenceMainReasonsPercentages: { [key: string]: number };
}

export interface AbsenceLegendItem {
  color: string;
  text: string;
  value: string;
}

export interface AbsenceDetailsDataSet {
  legendItems: AbsenceLegendItem[];
  chart: {
    data: number[];
    colors: string[];
  };
  appendix: string;
}

const toText = (rate: number) => toPercentageDataSet(rate).text;
const toValue = (rate: number) => toPercentageDataSet(rate).value;

const defaultAbsenceReasonsPercentages = {
  studentAbsenceMainReasonsPercentages: { '1': -1, '2': -1, '3': -1, '4': -1, '5': -1 },
  teacherAbsenceMainReasonsPercentages: { '1': -1, '2': -1, '3': -1, '4': -1 },
  adminAbsenceMainReasonsPercentages: { '1': -1, '2': -1, '3': -1, '4': -1 },
};

const toReportedSickText = (attendanceType: AttendanceType): string => {
  switch (attendanceType) {
    case AttendanceType.STUDENT:
      return 'Reportaron enfermos a los alumnos que no asistieron';
    case AttendanceType.TEACHER:
      return 'Reportaron enfermos a los docentes que no asistieron';
    case AttendanceType.PERSONAL:
      return 'Reportaron enfermo al personal que no asistió';
  }
};

export const toAbsenceDetailsDataSet = (
  absenceReasonsPercentages: AbsenceReasonsPercentages | null,
  attendanceType: AttendanceType
): AbsenceDetailsDataSet => {
  const validAbsenceReasons = absenceReasonsPercentages || defaultAbsenceReasonsPercentages;

  const mainReasons =
    attendanceType === AttendanceType.STUDENT
      ? validAbsenceReasons.studentAbsenceMainReasonsPercentages
      : attendanceType === AttendanceType.TEACHER
      ? validAbsenceReasons.teacherAbsenceMainReasonsPercentages
      : validAbsenceReasons.adminAbsenceMainReasonsPercentages;

  const partialLegendItems = [
    { color: 'primary', text: 'La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón' },
    { color: 'secondary', text: 'Los padres de familia no enviaron a sus hijos a la escuela' },
    { color: 'tertiary', text: toReportedSickText(attendanceType) },
    { color: 'tertiary', text: 'Se reportaron como inasistencia por enfermedad' },
    { color: 'grey', text: 'Se desconocen las causas' },
    { color: 'secondary-bis', text: 'Otras causas' },
  ];

  const legendItemsForAttendance =
    attendanceType === AttendanceType.STUDENT
      ? [partialLegendItems[0], partialLegendItems[1], partialLegendItems[2], partialLegendItems[4], partialLegendItems[5]]
      : [partialLegendItems[0], partialLegendItems[2], partialLegendItems[4], partialLegendItems[5]];

  const dataForAttendance =
    attendanceType === AttendanceType.STUDENT
      ? [mainReasons['1'], mainReasons['2'], mainReasons['3'], mainReasons['4'], mainReasons['5']].map(toValue)
      : [mainReasons['1'], 0, mainReasons['2'], mainReasons['3'], mainReasons['4']].map(toValue);

  return {
    legendItems: legendItemsForAttendance.map((item, index) => ({ ...item, value: toText(mainReasons[(index + 1).toString()]) })),
    chart: {
      data: dataForAttendance,
      colors: ['#b38e5d', '#9d2449', '#285c4d', '#C0C0C0', '#621132'],
    },
    appendix: attendanceType === AttendanceType.PERSONAL ? '*distinto a docentes' : '',
  };
};
