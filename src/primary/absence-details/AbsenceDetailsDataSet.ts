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

  const studentsPartialLegendItems = [
    { color: 'primary', text: 'Los padres de familia no enviaron a sus hijos a la escuela' },
    { color: 'secondary', text: 'Reportados con síntomas de contagio' },
    { color: 'tertiary', text: 'Casos de contagio (COVID 19) confirmados' },
    { color: 'grey', text: 'Se desconocen las causas' },
    { color: 'secondary-bis', text: 'Otras causas' },
  ];

  const teachersAndAdminsPartialLegendItems = [
    { color: 'primary', text: 'Casos de contagio (COVID 19) confirmados' },
    { color: 'tertiary', text: 'Se reportaron enfermos (NO COVID 19)' },
    { color: 'grey', text: 'Se desconocen las causas' },
    { color: 'secondary-bis', text: 'Otras causas' },
  ];

  const legendItemsForAttendance =
    attendanceType === AttendanceType.STUDENT ? studentsPartialLegendItems : teachersAndAdminsPartialLegendItems;

  const dataForAttendance =
    attendanceType === AttendanceType.STUDENT
      ? [mainReasons['1'], mainReasons['3'], mainReasons['4'], mainReasons['5']].map(toValue)
      : [mainReasons['1'], mainReasons['2'], mainReasons['3'], mainReasons['4']].map(toValue);

  const studentsLegendItems = [
    { ...legendItemsForAttendance[0], value: toText(mainReasons['1']) },
    { ...legendItemsForAttendance[2], value: toText(mainReasons['3']) },
    { ...legendItemsForAttendance[3], value: toText(mainReasons['4']) },
    { ...legendItemsForAttendance[4], value: toText(mainReasons['5']) },
  ];

  const teachersAndAdminsLegendItems = [
    { ...legendItemsForAttendance[0], value: toText(mainReasons['1']) },
    { ...legendItemsForAttendance[1], value: toText(mainReasons['2']) },
    { ...legendItemsForAttendance[2], value: toText(mainReasons['3']) },
    { ...legendItemsForAttendance[3], value: toText(mainReasons['4']) },
  ];

  const legendItems = attendanceType === AttendanceType.STUDENT ? studentsLegendItems : teachersAndAdminsLegendItems;

  return {
    legendItems,
    chart: {
      data: dataForAttendance,
      colors: ['#b38e5d', '#285c4d', '#C0C0C0', '#621132'],
    },
    appendix: attendanceType === AttendanceType.PERSONAL ? '*distinto a docentes' : '',
  };
};
