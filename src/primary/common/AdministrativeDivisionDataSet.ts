import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';

export interface AdministrativeDivisionDataset {
  support: { private: string; public: string };
  femaleStudentAttendance: string;
  maleStudentAttendance: string;
  teacherAttendance: string;
  adminAttendance: string;
  schools: string;
  students: string;
  femaleStudents: string;
  maleStudents: string;
  teachers: string;
  assistants: string;
  directors: string;
  subDirectors: string;
  technicalPedagogicalAdvisers: string;
  physicalEducationTeachers: string;
  admins: string;
  quartermasters: string;
  others: string;
  schoolGivingClasses: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
  };
  schoolWaterSupply: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  schoolWaterServiceContinuity: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  schoolWithWaterForHandWashing: {
    '1': string;
    '2': string;
  };
  schoolSinkSufficiency: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolSoapSufficiency: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolTowelSufficiency: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolSanitizerSufficiency: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolBinSufficiency: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolWithSepticSystem: {
    '1': string;
    '2': string;
  };
  schoolWithAbilityToReorganizeSpace: {
    '1': string;
    '2': string;
  };
  hygieneCommittee: {
    '1': string;
    '2': string;
  };
  alternatesAttendance: {
    '1': string;
    '2': string;
  };
  absentFemaleStudents: string;
  absentMaleStudents: string;
  studentAbsenceMainReasons: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
  };
  absentTeachers: string;
  teacherAbsenceMainReasons: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  absentAdmins: string;
  adminsAbsenceMainReasons: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;
const toPercentageIfValidRate = (rate: number) => (validRate(rate) ? toPercentage(rate) : '-');

export const toAdministrativeDivisionDataset = (
  administrativeDivision: AdministrativeDivision | undefined
): AdministrativeDivisionDataset =>
  administrativeDivision
    ? {
        support: {
          private: administrativeDivision.support.private.toString(),
          public: administrativeDivision.support.public.toString(),
        },
        femaleStudentAttendance: administrativeDivision.femaleStudentAttendance.toString(),
        maleStudentAttendance: administrativeDivision.maleStudentAttendance.toString(),
        teacherAttendance: administrativeDivision.teacherAttendance.toString(),
        adminAttendance: administrativeDivision.adminAttendance.toString(),
        schools: administrativeDivision.schools.toString(),
        students: administrativeDivision.students.toString(),
        femaleStudents: administrativeDivision.femaleStudents.toString(),
        maleStudents: administrativeDivision.maleStudents.toString(),
        teachers: administrativeDivision.teachers.toString(),
        assistants: administrativeDivision.assistants.toString(),
        directors: administrativeDivision.directors.toString(),
        subDirectors: administrativeDivision.subDirectors.toString(),
        technicalPedagogicalAdvisers: administrativeDivision.technicalPedagogicalAdvisers.toString(),
        physicalEducationTeachers: administrativeDivision.physicalEducationTeachers.toString(),
        admins: administrativeDivision.admins.toString(),
        quartermasters: administrativeDivision.quartermasters.toString(),
        others: administrativeDivision.others.toString(),
        schoolGivingClasses: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['3']),
          '4': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['4']),
          '5': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['5']),
          '6': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['6']),
          '7': toPercentageIfValidRate(administrativeDivision.schoolGivingClasses['7']),
        },
        schoolWaterSupply: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolWaterSupply['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolWaterSupply['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolWaterSupply['3']),
          '4': toPercentageIfValidRate(administrativeDivision.schoolWaterSupply['4']),
        },
        schoolWaterServiceContinuity: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolWaterServiceContinuity['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolWaterServiceContinuity['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolWaterServiceContinuity['3']),
          '4': toPercentageIfValidRate(administrativeDivision.schoolWaterServiceContinuity['4']),
        },
        schoolWithWaterForHandWashing: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolWithWaterForHandWashing['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolWithWaterForHandWashing['2']),
        },
        schoolSinkSufficiency: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolSinkSufficiency['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolSinkSufficiency['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolSinkSufficiency['3']),
        },
        schoolSoapSufficiency: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolSoapSufficiency['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolSoapSufficiency['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolSoapSufficiency['3']),
        },
        schoolTowelSufficiency: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolTowelSufficiency['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolTowelSufficiency['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolTowelSufficiency['3']),
        },
        schoolSanitizerSufficiency: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolSanitizerSufficiency['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolSanitizerSufficiency['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolSanitizerSufficiency['3']),
        },
        schoolBinSufficiency: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolBinSufficiency['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolBinSufficiency['2']),
          '3': toPercentageIfValidRate(administrativeDivision.schoolBinSufficiency['3']),
        },
        schoolWithSepticSystem: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolWithSepticSystem['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolWithSepticSystem['2']),
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': toPercentageIfValidRate(administrativeDivision.schoolWithAbilityToReorganizeSpace['1']),
          '2': toPercentageIfValidRate(administrativeDivision.schoolWithAbilityToReorganizeSpace['2']),
        },
        hygieneCommittee: {
          '1': toPercentageIfValidRate(administrativeDivision.hygieneCommittee['1']),
          '2': toPercentageIfValidRate(administrativeDivision.hygieneCommittee['2']),
        },
        alternatesAttendance: {
          '1': toPercentageIfValidRate(administrativeDivision.alternatesAttendance['1']),
          '2': toPercentageIfValidRate(administrativeDivision.alternatesAttendance['2']),
        },
        absentFemaleStudents: administrativeDivision.absentFemaleStudents.toString(),
        absentMaleStudents: administrativeDivision.absentMaleStudents.toString(),
        studentAbsenceMainReasons: {
          '1': toPercentageIfValidRate(administrativeDivision.studentAbsenceMainReasons['1']),
          '2': toPercentageIfValidRate(administrativeDivision.studentAbsenceMainReasons['2']),
          '3': toPercentageIfValidRate(administrativeDivision.studentAbsenceMainReasons['3']),
          '4': toPercentageIfValidRate(administrativeDivision.studentAbsenceMainReasons['4']),
          '5': toPercentageIfValidRate(administrativeDivision.studentAbsenceMainReasons['5']),
        },
        absentTeachers: administrativeDivision.absentTeachers.toString(),
        teacherAbsenceMainReasons: {
          '1': toPercentageIfValidRate(administrativeDivision.teacherAbsenceMainReasons['1']),
          '2': toPercentageIfValidRate(administrativeDivision.teacherAbsenceMainReasons['2']),
          '3': toPercentageIfValidRate(administrativeDivision.teacherAbsenceMainReasons['3']),
          '4': toPercentageIfValidRate(administrativeDivision.teacherAbsenceMainReasons['4']),
        },
        absentAdmins: administrativeDivision.absentAdmins.toString(),
        adminsAbsenceMainReasons: {
          '1': toPercentageIfValidRate(administrativeDivision.adminsAbsenceMainReasons['1']),
          '2': toPercentageIfValidRate(administrativeDivision.adminsAbsenceMainReasons['2']),
          '3': toPercentageIfValidRate(administrativeDivision.adminsAbsenceMainReasons['3']),
          '4': toPercentageIfValidRate(administrativeDivision.adminsAbsenceMainReasons['4']),
        },
      }
    : {
        support: { private: '-', public: '-' },
        femaleStudentAttendance: '-',
        maleStudentAttendance: '-',
        teacherAttendance: '-',
        adminAttendance: '-',
        schools: '-',
        students: '-',
        femaleStudents: '-',
        maleStudents: '-',
        teachers: '-',
        assistants: '-',
        directors: '-',
        subDirectors: '-',
        technicalPedagogicalAdvisers: '-',
        physicalEducationTeachers: '-',
        admins: '-',
        quartermasters: '-',
        others: '-',
        schoolGivingClasses: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
          '5': '-',
          '6': '-',
          '7': '-',
        },
        schoolWaterSupply: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        schoolWaterServiceContinuity: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        schoolWithWaterForHandWashing: {
          '1': '-',
          '2': '-',
        },
        schoolSinkSufficiency: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolSoapSufficiency: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolTowelSufficiency: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolSanitizerSufficiency: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolBinSufficiency: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolWithSepticSystem: {
          '1': '-',
          '2': '-',
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': '-',
          '2': '-',
        },
        hygieneCommittee: {
          '1': '-',
          '2': '-',
        },
        alternatesAttendance: {
          '1': '-',
          '2': '-',
        },
        absentFemaleStudents: '-',
        absentMaleStudents: '-',
        studentAbsenceMainReasons: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
          '5': '-',
        },
        absentTeachers: '-',
        teacherAbsenceMainReasons: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        absentAdmins: '-',
        adminsAbsenceMainReasons: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
      };
