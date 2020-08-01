import { AttendanceType } from '@/domain/AttendanceType';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AbsenceReasons {
  studentAbsenceMainReasons: { [key: string]: number };
  teacherAbsenceMainReasons: { [key: string]: number };
  adminAbsenceMainReasons: { [key: string]: number };
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

const defaultAbsenceReasons = {
  studentAbsenceMainReasons: { '1': -1, '2': -1, '3': -1, '4': -1, '5': -1 },
  teacherAbsenceMainReasons: { '1': -1, '2': -1, '3': -1, '4': -1 },
  adminAbsenceMainReasons: { '1': -1, '2': -1, '3': -1, '4': -1 },
};

export const toAbsenceDetailsDataSet = (absenceReasons: AbsenceReasons | null, attendanceType: AttendanceType): AbsenceDetailsDataSet => {
  const validAbsenceReasons = absenceReasons || defaultAbsenceReasons;

  const mainReasons =
    attendanceType === AttendanceType.STUDENT
      ? validAbsenceReasons.studentAbsenceMainReasons
      : attendanceType === AttendanceType.TEACHER
      ? validAbsenceReasons.teacherAbsenceMainReasons
      : validAbsenceReasons.adminAbsenceMainReasons;

  const partialLegendItems = [
    { color: 'primary', text: 'La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón' },
    { color: 'secondary', text: 'Los padres de familia no enviaron a sus hijos a la escuela' },
    { color: 'tertiary', text: 'Reportaron enfermos a los alumnos que no asistieron' },
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
