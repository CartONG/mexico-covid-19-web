import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';

export interface AdministrativeDivisionDataset {
  totalSchools: string;
  totalStudent: string;
  schoolGivingClassesPercentages: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
  };
  studentsFirstGrade: string;
  studentsSecondGrade: string;
  studentsThirdGrade: string;
  studentsFourthGrade: string;
  studentsFifthGrade: string;
  studentsSixthGrade: string;
  teachersFirstGrade: string;
  teachersSecondGrade: string;
  teachersThirdGrade: string;
  teachersFourthGrade: string;
  teachersFifthGrade: string;
  teachersSixthGrade: string;
  assistantsFirstGrade: string;
  assistantsSecondGrade: string;
  assistantsThirdGrade: string;
  assistantsFourthGrade: string;
  assistantsFifthGrade: string;
  assistantsSixthGrade: string;
  absentStudentsFirstGrade: string;
  absentStudentsSecondGrade: string;
  absentStudentsThirdGrade: string;
  absentStudentsFourthGrade: string;
  absentStudentsFifthGrade: string;
  absentStudentsSixthGrade: string;
  absentTeachersFirstGrade: string;
  absentTeachersSecondGrade: string;
  absentTeachersThirdGrade: string;
  absentTeachersFourthGrade: string;
  absentTeachersFifthGrade: string;
  absentTeachersSixthGrade: string;
  directors: string;
  subDirector: string;
  technicalPedagogicalAdvisers: string;
  physicalEducationTeachers: string;
  administrativeStaff: string;
  quartermasterStaff: string;
  others: string;
  absentDirectors: string;
  absentSubDirector: string;
  absentTechnicalPedagogicalAdvisers: string;
  absentPhysicalEducationTeachers: string;
  absentAdministrativeStaff: string;
  absentQuartermasterStaff: string;
  absentOthers: string;
  studentAbsenceMainReasonPercentages: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  schoolWaterSupplyPercentages: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  schoolWaterServiceContinuityPercentages: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
  };
  schoolWithWaterForHandWashingPercentages: {
    '1': string;
    '2': string;
  };
  schoolSinkSufficiencyPercentages: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolSoapSufficiencyPercentages: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolTowelSufficiencyPercentages: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolSanitizerSufficiencyPercentages: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolBinSufficiencyPercentages: {
    '1': string;
    '2': string;
    '3': string;
  };
  schoolWithSepticSystemPercentages: {
    '1': string;
    '2': string;
  };
  schoolWithAbilityToReorganizeSpacePercentages: {
    '1': string;
    '2': string;
  };
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

export const toAdministrativeDivisionDataset = (
  administrativeDivision: AdministrativeDivision | undefined
): AdministrativeDivisionDataset =>
  administrativeDivision
    ? {
        totalSchools: administrativeDivision.totalSchools.toString(),
        totalStudent: administrativeDivision.totalStudent.toString(),
        schoolGivingClassesPercentages: {
          '1': validRate(administrativeDivision.schoolBinSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolBinSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolBinSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['3'])
            : '-',
          '4': validRate(administrativeDivision.schoolBinSufficiencyPercentages['4'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['4'])
            : '-',
          '5': validRate(administrativeDivision.schoolBinSufficiencyPercentages['5'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['5'])
            : '-',
          '6': validRate(administrativeDivision.schoolBinSufficiencyPercentages['6'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['6'])
            : '-',
          '7': validRate(administrativeDivision.schoolBinSufficiencyPercentages['7'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['7'])
            : '-',
        },
        studentsFirstGrade: administrativeDivision.studentsFirstGrade.toString(),
        studentsSecondGrade: administrativeDivision.studentsSecondGrade.toString(),
        studentsThirdGrade: administrativeDivision.studentsThirdGrade.toString(),
        studentsFourthGrade: administrativeDivision.studentsFourthGrade.toString(),
        studentsFifthGrade: administrativeDivision.studentsFifthGrade.toString(),
        studentsSixthGrade: administrativeDivision.studentsSixthGrade.toString(),
        teachersFirstGrade: administrativeDivision.teachersFirstGrade.toString(),
        teachersSecondGrade: administrativeDivision.teachersSecondGrade.toString(),
        teachersThirdGrade: administrativeDivision.teachersThirdGrade.toString(),
        teachersFourthGrade: administrativeDivision.teachersFourthGrade.toString(),
        teachersFifthGrade: administrativeDivision.teachersFifthGrade.toString(),
        teachersSixthGrade: administrativeDivision.teachersSixthGrade.toString(),
        assistantsFirstGrade: administrativeDivision.assistantsFirstGrade.toString(),
        assistantsSecondGrade: administrativeDivision.assistantsSecondGrade.toString(),
        assistantsThirdGrade: administrativeDivision.assistantsThirdGrade.toString(),
        assistantsFourthGrade: administrativeDivision.assistantsFourthGrade.toString(),
        assistantsFifthGrade: administrativeDivision.assistantsFifthGrade.toString(),
        assistantsSixthGrade: administrativeDivision.assistantsSixthGrade.toString(),
        absentStudentsFirstGrade: administrativeDivision.absentStudentsFirstGrade.toString(),
        absentStudentsSecondGrade: administrativeDivision.absentStudentsSecondGrade.toString(),
        absentStudentsThirdGrade: administrativeDivision.absentStudentsThirdGrade.toString(),
        absentStudentsFourthGrade: administrativeDivision.absentStudentsFourthGrade.toString(),
        absentStudentsFifthGrade: administrativeDivision.absentStudentsFifthGrade.toString(),
        absentStudentsSixthGrade: administrativeDivision.absentStudentsSixthGrade.toString(),
        absentTeachersFirstGrade: administrativeDivision.absentTeachersFirstGrade.toString(),
        absentTeachersSecondGrade: administrativeDivision.absentTeachersSecondGrade.toString(),
        absentTeachersThirdGrade: administrativeDivision.absentTeachersThirdGrade.toString(),
        absentTeachersFourthGrade: administrativeDivision.absentTeachersFourthGrade.toString(),
        absentTeachersFifthGrade: administrativeDivision.absentTeachersFifthGrade.toString(),
        absentTeachersSixthGrade: administrativeDivision.absentTeachersSixthGrade.toString(),
        directors: administrativeDivision.directors.toString(),
        subDirector: administrativeDivision.subDirector.toString(),
        technicalPedagogicalAdvisers: administrativeDivision.technicalPedagogicalAdvisers.toString(),
        physicalEducationTeachers: administrativeDivision.physicalEducationTeachers.toString(),
        administrativeStaff: administrativeDivision.administrativeStaff.toString(),
        quartermasterStaff: administrativeDivision.quartermasterStaff.toString(),
        others: administrativeDivision.others.toString(),
        absentDirectors: administrativeDivision.absentDirectors.toString(),
        absentSubDirector: administrativeDivision.absentSubDirector.toString(),
        absentTechnicalPedagogicalAdvisers: administrativeDivision.absentTechnicalPedagogicalAdvisers.toString(),
        absentPhysicalEducationTeachers: administrativeDivision.absentPhysicalEducationTeachers.toString(),
        absentAdministrativeStaff: administrativeDivision.absentAdministrativeStaff.toString(),
        absentQuartermasterStaff: administrativeDivision.absentQuartermasterStaff.toString(),
        absentOthers: administrativeDivision.absentOthers.toString(),
        studentAbsenceMainReasonPercentages: {
          '1': validRate(administrativeDivision.studentAbsenceMainReasonPercentages['1'])
            ? toPercentage(administrativeDivision.studentAbsenceMainReasonPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.studentAbsenceMainReasonPercentages['2'])
            ? toPercentage(administrativeDivision.studentAbsenceMainReasonPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.studentAbsenceMainReasonPercentages['3'])
            ? toPercentage(administrativeDivision.studentAbsenceMainReasonPercentages['3'])
            : '-',
          '4': validRate(administrativeDivision.studentAbsenceMainReasonPercentages['4'])
            ? toPercentage(administrativeDivision.studentAbsenceMainReasonPercentages['4'])
            : '-',
        },
        schoolWaterSupplyPercentages: {
          '1': validRate(administrativeDivision.schoolWaterSupplyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolWaterSupplyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolWaterSupplyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolWaterSupplyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolWaterSupplyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolWaterSupplyPercentages['3'])
            : '-',
          '4': validRate(administrativeDivision.schoolWaterSupplyPercentages['4'])
            ? toPercentage(administrativeDivision.schoolWaterSupplyPercentages['4'])
            : '-',
        },
        schoolWaterServiceContinuityPercentages: {
          '1': validRate(administrativeDivision.schoolWaterServiceContinuityPercentages['1'])
            ? toPercentage(administrativeDivision.schoolWaterServiceContinuityPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolWaterServiceContinuityPercentages['2'])
            ? toPercentage(administrativeDivision.schoolWaterServiceContinuityPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolWaterServiceContinuityPercentages['3'])
            ? toPercentage(administrativeDivision.schoolWaterServiceContinuityPercentages['3'])
            : '-',
          '4': validRate(administrativeDivision.schoolWaterServiceContinuityPercentages['4'])
            ? toPercentage(administrativeDivision.schoolWaterServiceContinuityPercentages['4'])
            : '-',
        },
        schoolWithWaterForHandWashingPercentages: {
          '1': validRate(administrativeDivision.schoolWithWaterForHandWashingPercentages['1'])
            ? toPercentage(administrativeDivision.schoolWithWaterForHandWashingPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolWithWaterForHandWashingPercentages['2'])
            ? toPercentage(administrativeDivision.schoolWithWaterForHandWashingPercentages['2'])
            : '-',
        },
        schoolSinkSufficiencyPercentages: {
          '1': validRate(administrativeDivision.schoolSinkSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolSinkSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolSinkSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolSinkSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolSinkSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolSinkSufficiencyPercentages['3'])
            : '-',
        },
        schoolSoapSufficiencyPercentages: {
          '1': validRate(administrativeDivision.schoolSoapSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolSoapSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolSoapSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolSoapSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolSoapSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolSoapSufficiencyPercentages['3'])
            : '-',
        },
        schoolTowelSufficiencyPercentages: {
          '1': validRate(administrativeDivision.schoolTowelSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolTowelSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolTowelSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolTowelSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolTowelSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolTowelSufficiencyPercentages['3'])
            : '-',
        },
        schoolSanitizerSufficiencyPercentages: {
          '1': validRate(administrativeDivision.schoolSanitizerSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolSanitizerSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolSanitizerSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolSanitizerSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolSanitizerSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolSanitizerSufficiencyPercentages['3'])
            : '-',
        },
        schoolBinSufficiencyPercentages: {
          '1': validRate(administrativeDivision.schoolBinSufficiencyPercentages['1'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolBinSufficiencyPercentages['2'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['2'])
            : '-',
          '3': validRate(administrativeDivision.schoolBinSufficiencyPercentages['3'])
            ? toPercentage(administrativeDivision.schoolBinSufficiencyPercentages['3'])
            : '-',
        },
        schoolWithSepticSystemPercentages: {
          '1': validRate(administrativeDivision.schoolWithSepticSystemPercentages['1'])
            ? toPercentage(administrativeDivision.schoolWithSepticSystemPercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolWithSepticSystemPercentages['2'])
            ? toPercentage(administrativeDivision.schoolWithSepticSystemPercentages['2'])
            : '-',
        },
        schoolWithAbilityToReorganizeSpacePercentages: {
          '1': validRate(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1'])
            ? toPercentage(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1'])
            : '-',
          '2': validRate(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['2'])
            ? toPercentage(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['2'])
            : '-',
        },
      }
    : {
        totalSchools: '-',
        totalStudent: '-',
        schoolGivingClassesPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
          '5': '-',
          '6': '-',
          '7': '-',
        },
        studentsFirstGrade: '-',
        studentsSecondGrade: '-',
        studentsThirdGrade: '-',
        studentsFourthGrade: '-',
        studentsFifthGrade: '-',
        studentsSixthGrade: '-',
        teachersFirstGrade: '-',
        teachersSecondGrade: '-',
        teachersThirdGrade: '-',
        teachersFourthGrade: '-',
        teachersFifthGrade: '-',
        teachersSixthGrade: '-',
        assistantsFirstGrade: '-',
        assistantsSecondGrade: '-',
        assistantsThirdGrade: '-',
        assistantsFourthGrade: '-',
        assistantsFifthGrade: '-',
        assistantsSixthGrade: '-',
        absentStudentsFirstGrade: '-',
        absentStudentsSecondGrade: '-',
        absentStudentsThirdGrade: '-',
        absentStudentsFourthGrade: '-',
        absentStudentsFifthGrade: '-',
        absentStudentsSixthGrade: '-',
        absentTeachersFirstGrade: '-',
        absentTeachersSecondGrade: '-',
        absentTeachersThirdGrade: '-',
        absentTeachersFourthGrade: '-',
        absentTeachersFifthGrade: '-',
        absentTeachersSixthGrade: '-',
        directors: '-',
        subDirector: '-',
        technicalPedagogicalAdvisers: '-',
        physicalEducationTeachers: '-',
        administrativeStaff: '-',
        quartermasterStaff: '-',
        others: '-',
        absentDirectors: '-',
        absentSubDirector: '-',
        absentTechnicalPedagogicalAdvisers: '-',
        absentPhysicalEducationTeachers: '-',
        absentAdministrativeStaff: '-',
        absentQuartermasterStaff: '-',
        absentOthers: '-',
        studentAbsenceMainReasonPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        schoolWaterSupplyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        schoolWaterServiceContinuityPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
          '4': '-',
        },
        schoolWithWaterForHandWashingPercentages: {
          '1': '-',
          '2': '-',
        },
        schoolSinkSufficiencyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolSoapSufficiencyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolTowelSufficiencyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolSanitizerSufficiencyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolBinSufficiencyPercentages: {
          '1': '-',
          '2': '-',
          '3': '-',
        },
        schoolWithSepticSystemPercentages: {
          '1': '-',
          '2': '-',
        },
        schoolWithAbilityToReorganizeSpacePercentages: {
          '1': '-',
          '2': '-',
        },
      };
