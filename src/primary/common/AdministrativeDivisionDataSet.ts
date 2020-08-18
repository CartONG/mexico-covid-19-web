import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AdministrativeDivisionDataSet {
  support: { private: PercentageDataSet; public: PercentageDataSet };
  studentAttendance: PercentageDataSet;
  teacherAttendance: PercentageDataSet;
  adminAttendance: PercentageDataSet;
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
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
    '5': PercentageDataSet;
    '6': PercentageDataSet;
    '7': PercentageDataSet;
  };
  schoolWaterSupply: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  schoolWaterServiceContinuity: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  schoolWithWaterForHandWashing: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  schoolSinkSufficiency: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolSoapSufficiency: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolTowelSufficiency: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolSanitizerSufficiency: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolBinSufficiency: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolWithSepticSystem: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  schoolWithAbilityToReorganizeSpace: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  hygieneCommittee: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  alternatesAttendance: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  absentFemaleStudents: string;
  absentMaleStudents: string;
  studentAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
    '5': PercentageDataSet;
  };
  absentTeachers: string;
  teacherAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  absentAdmins: string;
  adminsAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
}

export const toAdministrativeDivisionDataset = (
  administrativeDivision: AdministrativeDivision | undefined
): AdministrativeDivisionDataSet =>
  administrativeDivision
    ? {
        support: {
          private: toPercentageDataSet(administrativeDivision.support.private),
          public: toPercentageDataSet(administrativeDivision.support.public),
        },
        studentAttendance: toPercentageDataSet(administrativeDivision.studentAttendance),
        teacherAttendance: toPercentageDataSet(administrativeDivision.teacherAttendance),
        adminAttendance: toPercentageDataSet(administrativeDivision.adminAttendance),
        schools: administrativeDivision.schools.toLocaleString('es-MX'),
        students: administrativeDivision.students.toString(),
        femaleStudents: administrativeDivision.femaleStudents.toString(),
        maleStudents: administrativeDivision.maleStudents.toString(),
        teachers: administrativeDivision.teachers.toLocaleString('es-MX'),
        assistants: administrativeDivision.assistants.toLocaleString('es-MX'),
        directors: administrativeDivision.directors.toLocaleString('es-MX'),
        subDirectors: administrativeDivision.subDirectors.toLocaleString('es-MX'),
        technicalPedagogicalAdvisers: administrativeDivision.technicalPedagogicalAdvisers.toLocaleString('es-MX'),
        physicalEducationTeachers: administrativeDivision.physicalEducationTeachers.toLocaleString('es-MX'),
        admins: administrativeDivision.admins.toLocaleString('es-MX'),
        quartermasters: administrativeDivision.quartermasters.toLocaleString('es-MX'),
        others: administrativeDivision.others.toLocaleString('es-MX'),
        schoolGivingClasses: {
          '1': toPercentageDataSet(administrativeDivision.schoolGivingClasses['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolGivingClasses['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolGivingClasses['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolGivingClasses['4']),
          '5': toPercentageDataSet(administrativeDivision.schoolGivingClasses['5']),
          '6': toPercentageDataSet(administrativeDivision.schoolGivingClasses['6']),
          '7': toPercentageDataSet(administrativeDivision.schoolGivingClasses['7']),
        },
        schoolWaterSupply: {
          '1': toPercentageDataSet(administrativeDivision.schoolWaterSupply['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWaterSupply['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolWaterSupply['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolWaterSupply['4']),
        },
        schoolWaterServiceContinuity: {
          '1': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuity['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuity['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuity['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuity['4']),
        },
        schoolWithWaterForHandWashing: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithWaterForHandWashing['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithWaterForHandWashing['2']),
        },
        schoolSinkSufficiency: {
          '1': toPercentageDataSet(administrativeDivision.schoolSinkSufficiency['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSinkSufficiency['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSinkSufficiency['3']),
        },
        schoolSoapSufficiency: {
          '1': toPercentageDataSet(administrativeDivision.schoolSoapSufficiency['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSoapSufficiency['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSoapSufficiency['3']),
        },
        schoolTowelSufficiency: {
          '1': toPercentageDataSet(administrativeDivision.schoolTowelSufficiency['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolTowelSufficiency['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolTowelSufficiency['3']),
        },
        schoolSanitizerSufficiency: {
          '1': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiency['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiency['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiency['3']),
        },
        schoolBinSufficiency: {
          '1': toPercentageDataSet(administrativeDivision.schoolBinSufficiency['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolBinSufficiency['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolBinSufficiency['3']),
        },
        schoolWithSepticSystem: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithSepticSystem['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithSepticSystem['2']),
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpace['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpace['2']),
        },
        hygieneCommittee: {
          '1': toPercentageDataSet(administrativeDivision.hygieneCommittee['1']),
          '2': toPercentageDataSet(administrativeDivision.hygieneCommittee['2']),
        },
        alternatesAttendance: {
          '1': toPercentageDataSet(administrativeDivision.alternatesAttendance['1']),
          '2': toPercentageDataSet(administrativeDivision.alternatesAttendance['2']),
        },
        absentFemaleStudents: administrativeDivision.absentFemaleStudents.toString(),
        absentMaleStudents: administrativeDivision.absentMaleStudents.toString(),
        studentAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['4']),
          '5': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['5']),
        },
        absentTeachers: administrativeDivision.absentTeachers.toString(),
        teacherAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['4']),
        },
        absentAdmins: administrativeDivision.absentAdmins.toString(),
        adminsAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['4']),
        },
      }
    : {
        support: { private: toPercentageDataSet(-1), public: toPercentageDataSet(-1) },
        studentAttendance: toPercentageDataSet(-1),
        teacherAttendance: toPercentageDataSet(-1),
        adminAttendance: toPercentageDataSet(-1),
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
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
          '5': toPercentageDataSet(-1),
          '6': toPercentageDataSet(-1),
          '7': toPercentageDataSet(-1),
        },
        schoolWaterSupply: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        schoolWaterServiceContinuity: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        schoolWithWaterForHandWashing: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        schoolSinkSufficiency: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolSoapSufficiency: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolTowelSufficiency: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolSanitizerSufficiency: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolBinSufficiency: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolWithSepticSystem: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        hygieneCommittee: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        alternatesAttendance: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        absentFemaleStudents: '-',
        absentMaleStudents: '-',
        studentAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
          '5': toPercentageDataSet(-1),
        },
        absentTeachers: '-',
        teacherAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        absentAdmins: '-',
        adminsAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
      };
