import { School } from '@/domain/school/School';
import { NumericDataSet, toNumericDataSet } from '@/primary/common/NumericDataSet';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

const turnTexts: { [key: string]: string } = {
  '1': 'matutino',
  '2': 'vespertino',
  '3': 'nocturno',
  '4': 'discontinuo',
  '5': 'continuo (tiempo completo)',
  '6': 'complementario',
  '7': 'continuo (jornada ampliada)',
};

const waterSupplyTexts: string[] = [
  '-',
  'Red municipal de agua potable',
  'Abastecimiento a través de pipas',
  'Otra fuente (pozo, río, lago, etc.)',
  'No cuenta con ningún tipo de abastecimiento',
];

const waterServiceContinuityTexts: string[] = [
  '-',
  'Todos los días',
  'De 2 a 4 días a la semana',
  'Una sola vez por semana',
  'No cuenta con servicio de agua',
];

const waterForHandWashingTexts: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Si', longText: 'Cuenta con agua para el lavado de manos' },
  { shortText: 'No', longText: 'No cuenta con agua para lavado de manos' },
];

const sinkSufficiencyTexts: string[] = ['-', 'Cuenta con suficientes lavamanos', 'No cuenta con suficientes lavamanos', 'No cuenta'];

const soapSufficiencyTexts: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Suficiente', longText: 'Cuenta con suficiente jabón' },
  { shortText: 'Insuficiente', longText: 'No cuenta con suficiente jabón' },
  { shortText: 'No', longText: 'No cuenta' },
];

const towelSufficiencyTexts: string[] = ['-', 'Cuenta con suficientes toallas', 'No cuenta con suficientes toallas', 'No cuenta'];

const sanitizerSufficiencyTexts: string[] = [
  '-',
  'Cuenta con suficiente alcohol en gel',
  'No cuenta con suficiente alcohol en gel',
  'No cuenta',
];

const binSufficiencyTexts: string[] = [
  '-',
  'Cuenta con suficientes botes de basura',
  'No cuenta con suficientes  botes de basura',
  'No cuenta',
];

const hasSepticSystemTexts: string[] = [
  '-',
  'Cuenta con Red de drenaje, fosa séptica para desalojo de aguas',
  'No cuenta con Red de drenaje, fosa séptica para desalojo de aguas',
];

const hasAbilityToReorganizeSpaceTexts: string[] = ['-', 'Si', 'No'];
const hasHygieneCommitteeTexts: string[] = ['-', 'Si', 'No'];
const alternatesAttendanceTexts: string[] = ['-', 'Si', 'No'];

const givesClassesText: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Si', longText: 'Personal y Alumnos realizan sus actividades en la escuela' },
  { shortText: 'No', longText: 'Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases' },
  { shortText: 'No', longText: 'Existe la confirmación de al menos un caso de COVID-19 en la escuela' },
  { shortText: 'No', longText: 'La Autoridad Educativa Local determinó continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'La comunidad escolar determinó continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'El personal de la escuela decidió continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'Los padres de familia informaron que no enviarán a sus hijos a la escuela' },
];

export interface SchoolDataSet {
  id: string;
  locality: string;
  name: string;
  femaleStudentAttendance: PercentageDataSet;
  maleStudentAttendance: PercentageDataSet;
  studentAttendance: PercentageDataSet;
  teacherAttendance: PercentageDataSet;
  adminAttendance: PercentageDataSet;
  level: string;
  workCenterKey: string;
  turn: string;
  givesClasses: { shortText: string; longText: string };
  modality: string;
  municipality: string;
  address: string;
  support: string;
  femaleStudent: string;
  maleStudent: string;
  students: string;
  teachers: string;
  assistants: string;
  directors: string;
  subDirectors: string;
  technicalPedagogicalAdvisers: string;
  physicalEducationTeachers: string;
  admins: string;
  quartermasters: string;
  others: string;
  waterSupply: string;
  waterServiceContinuity: string;
  waterForHandWashing: { shortText: string; longText: string };
  sinkSufficiency: string;
  soapSufficiency: { shortText: string; longText: string };
  towelSufficiency: string;
  sanitizerSufficiency: string;
  binSufficiency: string;
  hasSepticSystem: string;
  hasAbilityToReorganizeSpace: string;
  hasHygieneCommittee: string;
  alternatesAttendance: string;
  absentFemaleStudents: string;
  absentMaleStudents: string;
  studentAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
    '5': NumericDataSet;
  };
  studentAbsenceOtherReason: string;
  absentTeachers: string;
  teacherAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  teacherAbsenceOtherReason: string;
  absentAdmins: string;
  adminAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  adminAbsenceOtherReason: string;
  comments: string;
}

export const toSchoolDataSet = (school: School | undefined): SchoolDataSet =>
  school
    ? {
        id: school.id,
        locality: school.locality,
        name: school.name,
        femaleStudentAttendance: toPercentageDataSet(school.femaleStudentAttendance),
        maleStudentAttendance: toPercentageDataSet(school.maleStudentAttendance),
        studentAttendance: toPercentageDataSet(school.studentAttendance),
        teacherAttendance: toPercentageDataSet(school.teacherAttendance),
        adminAttendance: toPercentageDataSet(school.adminAttendance),
        level: school.level,
        workCenterKey: school.workCenterKey,
        turn: turnTexts[school.turn] || '-',
        givesClasses: givesClassesText[school.givesClasses],
        modality: school.modality,
        municipality: school.municipality,
        address: school.address,
        support: school.support,
        femaleStudent: school.femaleStudent.toString(),
        maleStudent: school.maleStudent.toString(),
        students: school.students.toString(),
        teachers: school.teachers.toLocaleString('es-MX'),
        assistants: school.assistants.toLocaleString('es-MX'),
        directors: school.directors.toLocaleString('es-MX'),
        subDirectors: school.subDirectors.toLocaleString('es-MX'),
        technicalPedagogicalAdvisers: school.technicalPedagogicalAdvisers.toLocaleString('es-MX'),
        physicalEducationTeachers: school.physicalEducationTeachers.toLocaleString('es-MX'),
        admins: school.admins.toLocaleString('es-MX'),
        quartermasters: school.quartermasters.toLocaleString('es-MX'),
        others: school.others.toLocaleString('es-MX'),
        waterSupply: waterSupplyTexts[school.waterSupply],
        waterServiceContinuity: waterServiceContinuityTexts[school.waterServiceContinuity],
        waterForHandWashing: waterForHandWashingTexts[school.waterForHandWashing],
        sinkSufficiency: sinkSufficiencyTexts[school.sinkSufficiency],
        soapSufficiency: soapSufficiencyTexts[school.soapSufficiency],
        towelSufficiency: towelSufficiencyTexts[school.towelSufficiency],
        sanitizerSufficiency: sanitizerSufficiencyTexts[school.sanitizerSufficiency],
        binSufficiency: binSufficiencyTexts[school.binSufficiency],
        hasSepticSystem: hasSepticSystemTexts[school.hasSepticSystem],
        hasAbilityToReorganizeSpace: hasAbilityToReorganizeSpaceTexts[school.hasAbilityToReorganizeSpace],
        hasHygieneCommittee: hasHygieneCommitteeTexts[school.hasHygieneCommittee],
        alternatesAttendance: alternatesAttendanceTexts[school.alternatesAttendance],
        absentFemaleStudents: school.absentFemaleStudents.toString(),
        absentMaleStudents: school.absentMaleStudents.toString(),
        studentAbsenceMainReasons: {
          '1': toNumericDataSet(school.studentAbsenceMainReasons['1']),
          '2': toNumericDataSet(school.studentAbsenceMainReasons['2']),
          '3': toNumericDataSet(school.studentAbsenceMainReasons['3']),
          '4': toNumericDataSet(school.studentAbsenceMainReasons['4']),
          '5': toNumericDataSet(school.studentAbsenceMainReasons['5']),
        },
        studentAbsenceOtherReason: school.studentAbsenceOtherReason,
        absentTeachers: school.absentTeachers.toString(),
        teacherAbsenceMainReasons: {
          '1': toNumericDataSet(school.teacherAbsenceMainReasons['1']),
          '2': toNumericDataSet(school.teacherAbsenceMainReasons['2']),
          '3': toNumericDataSet(school.teacherAbsenceMainReasons['3']),
          '4': toNumericDataSet(school.teacherAbsenceMainReasons['4']),
        },
        teacherAbsenceOtherReason: school.teacherAbsenceOtherReason,
        absentAdmins: school.absentAdmins.toString(),
        adminAbsenceMainReasons: {
          '1': toNumericDataSet(school.adminAbsenceMainReasons['1']),
          '2': toNumericDataSet(school.adminAbsenceMainReasons['2']),
          '3': toNumericDataSet(school.adminAbsenceMainReasons['3']),
          '4': toNumericDataSet(school.adminAbsenceMainReasons['4']),
        },
        adminAbsenceOtherReason: school.adminAbsenceOtherReason,
        comments: school.comments,
      }
    : {
        id: '-',
        locality: '-',
        name: '-',
        femaleStudentAttendance: toPercentageDataSet(-1),
        maleStudentAttendance: toPercentageDataSet(-1),
        studentAttendance: toPercentageDataSet(-1),
        teacherAttendance: toPercentageDataSet(-1),
        adminAttendance: toPercentageDataSet(-1),
        level: '-',
        workCenterKey: '-',
        turn: '-',
        givesClasses: givesClassesText[0],
        modality: '-',
        municipality: '-',
        address: '-',
        support: '-',
        femaleStudent: '-',
        maleStudent: '-',
        students: '-',
        teachers: '-',
        assistants: '-',
        directors: '-',
        subDirectors: '-',
        technicalPedagogicalAdvisers: '-',
        physicalEducationTeachers: '-',
        admins: '-',
        quartermasters: '-',
        others: '-',
        waterSupply: '-',
        waterServiceContinuity: '-',
        waterForHandWashing: waterForHandWashingTexts[0],
        sinkSufficiency: '-',
        soapSufficiency: soapSufficiencyTexts[0],
        towelSufficiency: '-',
        sanitizerSufficiency: '-',
        binSufficiency: '-',
        hasSepticSystem: '-',
        hasAbilityToReorganizeSpace: '-',
        hasHygieneCommittee: '-',
        alternatesAttendance: '-',
        absentFemaleStudents: '-',
        absentMaleStudents: '-',
        studentAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
          '5': toNumericDataSet(-1),
        },
        studentAbsenceOtherReason: '-',
        absentTeachers: '-',
        teacherAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        teacherAbsenceOtherReason: '-',
        absentAdmins: '-',
        adminAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        adminAbsenceOtherReason: '-',
        comments: '-',
      };
