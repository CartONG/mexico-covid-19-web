import { School } from '@/domain/school/School';
import { toNumericDataSet } from '@/primary/common/NumericDataSet';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface SchoolDataSet {
  locality: string;
  name: string;
  femaleStudentAttendance: PercentageDataSet;
  maleStudentAttendance: PercentageDataSet;
  teacherAttendance: PercentageDataSet;
  adminAttendance: PercentageDataSet;
  level: string;
  workCenterKey: string;
  turn: string;
  givesClasses: string;
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
  waterForHandWashing: string;
  sinkSufficiency: string;
  soapSufficiency: string;
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
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
    '5': PercentageDataSet;
  };
  studentAbsenceOtherReason: string;
  absentTeachers: string;
  teacherAbsenceMainReasons: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  teacherAbsenceOtherReason: string;
  absentAdmins: string;
  adminAbsenceMainReasons: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  adminAbsenceOtherReason: string;
  comments: string;
}

export const toSchoolDataSet = (school: School | undefined) =>
  school
    ? {
        locality: school.locality,
        name: school.name,
        femaleStudentAttendance: toPercentageDataSet(school.femaleStudentAttendance),
        maleStudentAttendance: toPercentageDataSet(school.maleStudentAttendance),
        teacherAttendance: toPercentageDataSet(school.teacherAttendance),
        adminAttendance: toPercentageDataSet(school.adminAttendance),
        level: school.level,
        workCenterKey: school.workCenterKey,
        turn: school.turn,
        givesClasses: school.givesClasses,
        modality: school.modality,
        municipality: school.municipality,
        address: school.address,
        support: school.support,
        femaleStudent: school.femaleStudent.toString(),
        maleStudent: school.maleStudent.toString(),
        students: school.students.toString(),
        teachers: school.teachers.toString(),
        assistants: school.assistants.toString(),
        directors: school.directors.toString(),
        subDirectors: school.subDirectors.toString(),
        technicalPedagogicalAdvisers: school.technicalPedagogicalAdvisers.toString(),
        physicalEducationTeachers: school.physicalEducationTeachers.toString(),
        admins: school.admins.toString(),
        quartermasters: school.quartermasters.toString(),
        others: school.others.toString(),
        waterSupply: school.waterSupply.toString(),
        waterServiceContinuity: school.waterServiceContinuity.toString(),
        waterForHandWashing: school.waterSupply.toString(),
        sinkSufficiency: school.sinkSufficiency.toString(),
        soapSufficiency: school.soapSufficiency.toString(),
        towelSufficiency: school.towelSufficiency.toString(),
        sanitizerSufficiency: school.sanitizerSufficiency.toString(),
        binSufficiency: school.binSufficiency.toString(),
        hasSepticSystem: school.hasSepticSystem.toString(),
        hasAbilityToReorganizeSpace: school.hasAbilityToReorganizeSpace.toString(),
        hasHygieneCommittee: school.hasHygieneCommittee.toString(),
        alternatesAttendance: school.alternatesAttendance.toString(),
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
        locality: '-',
        name: '-',
        femaleStudentAttendance: toPercentageDataSet(-1),
        maleStudentAttendance: toPercentageDataSet(-1),
        teacherAttendance: toPercentageDataSet(-1),
        adminAttendance: toPercentageDataSet(-1),
        level: '-',
        workCenterKey: '-',
        turn: '-',
        givesClasses: '-',
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
        waterForHandWashing: '-',
        sinkSufficiency: '-',
        soapSufficiency: '-',
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
